import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { config } from "../config/index.js";

export const s3Client = new S3Client({
  region: config.aws.region,
  credentials: config.aws.accessKeyId
    ? {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      }
    : undefined,
});

/**
 * Upload an audio buffer to S3 and return its public URL.
 */
export async function uploadAudioToS3(
  key: string,
  buffer: Buffer,
): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: config.aws.audioBucket,
      Key: key,
      Body: buffer,
      ContentType: "audio/mpeg",
      CacheControl: "public, max-age=604800, immutable",
    }),
  );

  return `https://${config.aws.audioBucket}.s3.${config.aws.region}.amazonaws.com/${key}`;
}

/**
 * Generate a presigned PUT URL for direct MP3 upload.
 * Returns { uploadUrl, objectUrl, s3Key }.
 */
export async function generateAudioUploadUrl(
  listeningContentId: string,
): Promise<{ uploadUrl: string; objectUrl: string; s3Key: string }> {
  const s3Key = `listening-audio/${listeningContentId}/${randomUUID()}.mp3`;

  const command = new PutObjectCommand({
    Bucket: config.aws.audioBucket,
    Key: s3Key,
    ContentType: "audio/mpeg",
    CacheControl: "public, max-age=604800, immutable",
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const objectUrl = `https://${config.aws.audioBucket}.s3.${config.aws.region}.amazonaws.com/${s3Key}`;

  return { uploadUrl, objectUrl, s3Key };
}

/**
 * Generate a presigned GET URL for an S3 audio object.
 * Expires in 1 hour. Works regardless of bucket public access settings.
 */
export async function getPresignedAudioUrl(s3Key: string): Promise<string> {
  if (!s3Key || typeof s3Key !== "string") {
    throw new Error("Invalid S3 key: empty or non-string");
  }
  if (s3Key.includes("..") || s3Key.startsWith("/")) {
    throw new Error("Invalid S3 key: path traversal detected");
  }

  const command = new GetObjectCommand({
    Bucket: config.aws.audioBucket,
    Key: s3Key,
  });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

/**
 * Extract S3 key from a stored audio URL.
 * Handles both regional and non-regional URL formats.
 */
export function extractS3KeyFromUrl(url: string): string | null {
  if (!url || typeof url !== "string" || url.length > 2048) {
    return null;
  }

  const bucket = config.aws.audioBucket;
  if (!bucket) return null;

  // Escape bucket name for regex safety
  const escapedBucket = bucket.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match: https://bucket.s3.region.amazonaws.com/key or https://bucket.s3.amazonaws.com/key
  const pattern = new RegExp(
    `^https://${escapedBucket}\\.s3(?:\\.[a-z0-9-]+)?\\.amazonaws\\.com/(.+)$`,
  );
  const match = url.match(pattern);
  return match ? match[1] : null;
}

/**
 * Best-effort deletion of an S3 object.
 */
export async function deleteFromS3(key: string): Promise<void> {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.aws.audioBucket,
        Key: key,
      }),
    );
  } catch (err) {
    console.error("S3 delete failed (best-effort):", err);
  }
}
