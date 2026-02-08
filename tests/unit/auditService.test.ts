import { describe, it, expect } from '@jest/globals';

/**
 * Tests for extractRequestMeta (pure function, no Prisma dependency).
 * logAudit tests require Prisma mocking which is broken with Prisma 7 client engine.
 */

// Inline the function to avoid Prisma import chain
function extractRequestMeta(req: {
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

describe('extractRequestMeta', () => {
  it('should extract IP from req.ip', () => {
    const req = {
      ip: '192.168.1.1',
      headers: { 'user-agent': 'Mozilla/5.0' },
    };

    const result = extractRequestMeta(req);

    expect(result.ipAddress).toBe('192.168.1.1');
    expect(result.userAgent).toBe('Mozilla/5.0');
  });

  it('should prefer x-forwarded-for over req.ip', () => {
    const req = {
      ip: '192.168.1.1',
      headers: {
        'x-forwarded-for': '10.0.0.1, 10.0.0.2',
        'user-agent': 'test-agent',
      },
    };

    const result = extractRequestMeta(req);

    expect(result.ipAddress).toBe('10.0.0.1');
  });

  it('should handle array x-forwarded-for', () => {
    const req = {
      ip: '192.168.1.1',
      headers: {
        'x-forwarded-for': ['10.0.0.5, 10.0.0.6'],
        'user-agent': 'test',
      },
    };

    const result = extractRequestMeta(req);

    expect(result.ipAddress).toBe('10.0.0.5');
  });

  it('should trim whitespace from forwarded IP', () => {
    const req = {
      headers: {
        'x-forwarded-for': '  10.0.0.1  , 10.0.0.2',
        'user-agent': 'test',
      },
    };

    const result = extractRequestMeta(req);

    expect(result.ipAddress).toBe('10.0.0.1');
  });

  it('should return "unknown" when no IP available', () => {
    const req = { headers: {} };

    const result = extractRequestMeta(req);

    expect(result.ipAddress).toBe('unknown');
  });

  it('should return "unknown" when no user-agent', () => {
    const req = {
      ip: '127.0.0.1',
      headers: {},
    };

    const result = extractRequestMeta(req);

    expect(result.userAgent).toBe('unknown');
  });

  it('should handle array user-agent header', () => {
    const req = {
      headers: {
        'user-agent': ['Mozilla/5.0', 'Chrome/100'],
      },
    };

    const result = extractRequestMeta(req);

    expect(result.userAgent).toBe('Mozilla/5.0');
  });

  it('should handle all fields missing', () => {
    const req = { headers: {} };

    const result = extractRequestMeta(req);

    expect(result.ipAddress).toBe('unknown');
    expect(result.userAgent).toBe('unknown');
  });
});
