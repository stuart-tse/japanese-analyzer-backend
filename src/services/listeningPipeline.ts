import { prisma } from '../config/prisma.js';
import { Prisma } from '../generated/prisma/index.js';
import {
  generateListeningQuestions,
  generateSegmentTranslations,
  type SegmentInput,
} from './listeningAI.js';
import type { ContentStatus, QuestionType } from '../generated/prisma/index.js';

/**
 * Process listening content: create segments from transcript,
 * generate translations and quiz questions.
 */
export async function processListeningContent(listeningContentId: string): Promise<void> {
  const content = await prisma.listeningContent.findUnique({
    where: { id: listeningContentId },
    include: { segments: { orderBy: { orderIndex: 'asc' } } },
  });

  if (!content) {
    throw new Error(`ListeningContent not found: ${listeningContentId}`);
  }

  if (!content.transcript.trim()) {
    throw new Error('Listening content has no transcript');
  }

  await prisma.listeningContent.update({
    where: { id: listeningContentId },
    data: { status: 'PROCESSING' as ContentStatus },
  });

  try {
    // Step 1: Create segments from transcript if none exist
    let segments: SegmentInput[];
    if (content.segments.length === 0) {
      segments = await createSegmentsFromTranscript(listeningContentId, content.transcript, content.duration);
    } else {
      segments = content.segments.map((s) => ({
        orderIndex: s.orderIndex,
        text: s.text,
        startTime: s.startTime,
        endTime: s.endTime,
      }));
    }

    if (segments.length === 0) {
      throw new Error('No segments could be created from transcript');
    }

    // Step 2: Generate segment translations via AI
    const translations = await generateSegmentTranslations(segments);
    for (const t of translations) {
      await prisma.listeningSegment.updateMany({
        where: { listeningContentId, orderIndex: t.index },
        data: { translationZh: t.translationZh },
      });
    }

    // Step 3: Generate listening questions via AI
    const questions = await generateListeningQuestions(segments, content.jlptLevel);

    // Step 4: Save questions to DB
    if (questions.length > 0) {
      // Delete old questions for this content first
      await prisma.generatedQuestion.deleteMany({
        where: { listeningContentId },
      });

      await prisma.generatedQuestion.createMany({
        data: questions.map((q) => ({
          listeningContentId,
          type: q.type as QuestionType,
          prompt: q.prompt,
          options: q.options ?? Prisma.JsonNull,
          answer: q.answer,
          explanation: q.explanation,
          explanationWrong: q.explanationWrong ?? Prisma.JsonNull,
          jlptLevel: q.jlptLevel,
          audioClip: q.audioClip as Prisma.InputJsonValue,
        })),
      });
    }

    // Step 5: Update status to DRAFT (admin publishes manually)
    await prisma.listeningContent.update({
      where: { id: listeningContentId },
      data: { status: 'DRAFT' as ContentStatus },
    });
  } catch (error) {
    await prisma.listeningContent.update({
      where: { id: listeningContentId },
      data: { status: 'FAILED' as ContentStatus },
    });
    throw error;
  }
}

/**
 * Split transcript into paragraph-based segments with estimated timestamps.
 * When no real timing data is available, distributes duration evenly.
 */
async function createSegmentsFromTranscript(
  listeningContentId: string,
  transcript: string,
  durationSeconds: number | null,
): Promise<SegmentInput[]> {
  const paragraphs = transcript
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (paragraphs.length === 0) return [];

  const totalDuration = durationSeconds || paragraphs.length * 30; // estimate 30s per paragraph
  const totalChars = paragraphs.reduce((sum, p) => sum + p.length, 0);

  const segments: SegmentInput[] = [];
  let currentTime = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const proportion = paragraphs[i].length / Math.max(totalChars, 1);
    const segDuration = totalDuration * proportion;
    const startTime = currentTime;
    const endTime = currentTime + segDuration;

    segments.push({
      orderIndex: i,
      text: paragraphs[i],
      startTime: Math.round(startTime * 10) / 10,
      endTime: Math.round(endTime * 10) / 10,
    });

    currentTime = endTime;
  }

  // Save to DB
  await prisma.listeningSegment.createMany({
    data: segments.map((s) => ({
      listeningContentId,
      orderIndex: s.orderIndex,
      text: s.text,
      startTime: s.startTime,
      endTime: s.endTime,
    })),
  });

  return segments;
}
