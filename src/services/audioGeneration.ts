/**
 * Audio Generation Service
 *
 * Generates TTS audio for content sections using Microsoft Edge TTS
 * (direct WebSocket via msedge-tts — same engine as /api/tts endpoint),
 * concatenates MP3 buffers, uploads to S3, and
 * returns metadata with section timestamps.
 */

import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { uploadAudioToS3 } from "./s3Service.js";

const EDGE_VOICE = "ja-JP-NanamiNeural";

// MP3 at ~48kbps (24khz-48kbit-mono) ≈ 6,000 bytes/second
const BYTES_PER_SECOND = 6_000;

// Japanese TTS reads ~6 characters/second at normal speed
const CHARS_PER_SECOND = 6;

export interface SectionTimestamp {
  sectionIndex: number;
  startTime: number;
  endTime: number;
}

export interface GeneratedAudio {
  s3Key: string;
  url: string;
  duration: number;
  sectionTimestamps: SectionTimestamp[];
}

/**
 * Collect a Node.js Readable stream into a Buffer.
 */
function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

/**
 * Call Edge TTS for a single text chunk via WebSocket.
 * Returns raw MP3 buffer.
 */
async function generateTtsForText(text: string): Promise<Buffer> {
  const ttsClient = new MsEdgeTTS();
  await ttsClient.setMetadata(
    EDGE_VOICE,
    OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3,
  );

  const { audioStream } = ttsClient.toStream(text);
  const buffer = await streamToBuffer(audioStream);
  ttsClient.close();

  if (buffer.byteLength === 0) {
    throw new Error("Edge TTS returned empty audio");
  }

  return buffer;
}

/**
 * Estimate audio duration from buffer byte length.
 * Uses MP3 bitrate assumption (~48kbps mono).
 */
function estimateDuration(buffer: Buffer): number {
  return Math.max(1, Math.round(buffer.byteLength / BYTES_PER_SECOND));
}

/**
 * Fallback: estimate duration from character count.
 */
function estimateDurationFromText(text: string): number {
  return Math.max(1, Math.round(text.length / CHARS_PER_SECOND));
}

/**
 * Generate TTS audio for all content sections.
 *
 * 1. Calls Edge TTS for each section
 * 2. Concatenates MP3 buffers
 * 3. Uploads to S3
 * 4. Returns metadata with S3 URL
 */
export async function generateContentAudio(
  contentItemId: string,
  sections: Array<{ orderIndex: number; text: string; type: string }>,
): Promise<GeneratedAudio> {
  if (!contentItemId || /[/\\]/.test(contentItemId)) {
    throw new Error("Invalid contentItemId");
  }

  const sectionTimestamps: SectionTimestamp[] = [];
  const audioBuffers: Buffer[] = [];
  let cumulativeTime = 0;

  // Filter to only sections with text
  const speakableSections = sections.filter(
    (s) => s.text.trim().length > 0,
  );

  for (const section of speakableSections) {
    const startTime = cumulativeTime;

    try {
      const buffer = await generateTtsForText(section.text);
      audioBuffers.push(buffer);

      const duration = estimateDuration(buffer);
      cumulativeTime += duration;
    } catch (err) {
      // If TTS fails for a section, estimate duration and skip audio
      console.error(
        `TTS failed for section ${section.orderIndex}:`,
        err instanceof Error ? err.message : err,
      );
      const fallbackDuration = estimateDurationFromText(section.text);
      cumulativeTime += fallbackDuration;
    }

    sectionTimestamps.push({
      sectionIndex: section.orderIndex,
      startTime,
      endTime: cumulativeTime,
    });
  }

  // Concatenate all MP3 buffers
  const combinedBuffer = Buffer.concat(audioBuffers);
  if (combinedBuffer.byteLength === 0) {
    throw new Error("No audio generated — all TTS calls failed");
  }

  const s3Key = `audio/${contentItemId}.mp3`;
  const url = await uploadAudioToS3(s3Key, combinedBuffer);

  return {
    s3Key,
    url,
    duration: cumulativeTime,
    sectionTimestamps,
  };
}
