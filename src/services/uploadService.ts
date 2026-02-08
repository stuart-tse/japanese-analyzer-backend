import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { TEXTS } from '../constants/texts.js';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const PRESIGNED_URL_EXPIRES_IN = 300; // 5 minutes

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      }
    : undefined, // Falls back to IAM role / env chain
});

const BUCKET = process.env.S3_AVATAR_BUCKET || 'japanese-analyzer-avatars';

/**
 * Generate a presigned PUT URL for avatar upload.
 * Returns the presigned URL and the final public object URL.
 */
export async function generateAvatarUploadUrl(
  userId: string,
  fileExtension: string
): Promise<{ uploadUrl: string; objectUrl: string; key: string }> {
  const ext = fileExtension.toLowerCase().replace('.', '');
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error(TEXTS.UPLOAD.INVALID_FILE_TYPE);
  }

  const key = `avatars/${userId}/${randomUUID()}.${ext}`;
  const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
    : ext === 'png' ? 'image/png'
    : 'image/webp';

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ServerSideEncryption: 'AES256',
    Metadata: { userId },
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: PRESIGNED_URL_EXPIRES_IN,
    signableHeaders: new Set(['content-type', 'x-amz-server-side-encryption']),
  });

  const objectUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`;

  return { uploadUrl, objectUrl, key };
}

export { ALLOWED_EXTENSIONS, MAX_FILE_SIZE };
