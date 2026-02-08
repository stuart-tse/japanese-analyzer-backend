import { prisma } from '../config/prisma.js';
import { Prisma } from '../generated/prisma/index.js';

interface AuditLogInput {
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Non-blocking audit log creation.
 * Failures are logged but never propagate to callers.
 */
export async function logAudit(input: AuditLogInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId ?? null,
        details: (input.details ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        ipAddress: input.ipAddress ?? null,
        userAgent: input.userAgent ?? null,
      },
    });
  } catch (error) {
    // Non-blocking: audit failures must never break user operations
    console.error('Audit log write failed:', error);
  }
}

/**
 * Extract IP address and User-Agent from an Express request.
 */
export function extractRequestMeta(req: {
  ip?: string;
  headers: Record<string, string | string[] | undefined>;
}): { ipAddress: string; userAgent: string } {
  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() ??
    req.ip ??
    'unknown';

  const ua = req.headers['user-agent'];
  const userAgent = (Array.isArray(ua) ? ua[0] : ua) ?? 'unknown';

  return { ipAddress, userAgent };
}
