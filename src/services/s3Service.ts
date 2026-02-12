import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
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

  return `https://${config.aws.audioBucket}.s3.amazonaws.com/${key}`;
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
  const objectUrl = `https://${config.aws.audioBucket}.s3.amazonaws.com/${s3Key}`;

  return { uploadUrl, objectUrl, s3Key };
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
