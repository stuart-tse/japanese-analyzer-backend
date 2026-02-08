import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

/**
 * Tests for profile validation logic.
 * These test the Zod schemas directly without Prisma mocking.
 */

const phoneRegex = /^\+[1-9]\d{1,14}$/;

const socialLinkSchema = z
  .string()
  .max(200)
  .nullable()
  .optional()
  .transform((v) => v?.trim() || null);

const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .transform((v) => v?.trim()),
  phone: z
    .string()
    .regex(phoneRegex, '电话号码格式无效')
    .nullable()
    .optional(),
  twitter: socialLinkSchema,
  weibo: socialLinkSchema,
  douyin: socialLinkSchema,
  tiktok: socialLinkSchema,
  instagram: socialLinkSchema,
});

describe('profileUpdateSchema', () => {
  describe('displayName', () => {
    it('should accept valid display name', () => {
      const result = profileUpdateSchema.parse({ displayName: 'Test User' });
      expect(result.displayName).toBe('Test User');
    });

    it('should trim whitespace', () => {
      const result = profileUpdateSchema.parse({ displayName: '  Test  ' });
      expect(result.displayName).toBe('Test');
    });

    it('should reject empty display name', () => {
      expect(() => profileUpdateSchema.parse({ displayName: '' })).toThrow();
    });

    it('should reject display name over 50 chars', () => {
      expect(() => profileUpdateSchema.parse({ displayName: 'a'.repeat(51) })).toThrow();
    });

    it('should accept display name of exactly 50 chars', () => {
      const name = 'a'.repeat(50);
      const result = profileUpdateSchema.parse({ displayName: name });
      expect(result.displayName).toBe(name);
    });
  });

  describe('phone', () => {
    it('should accept valid E.164 phone number', () => {
      const result = profileUpdateSchema.parse({ phone: '+8612345678900' });
      expect(result.phone).toBe('+8612345678900');
    });

    it('should accept valid US phone', () => {
      const result = profileUpdateSchema.parse({ phone: '+14155551234' });
      expect(result.phone).toBe('+14155551234');
    });

    it('should accept valid JP phone', () => {
      const result = profileUpdateSchema.parse({ phone: '+819012345678' });
      expect(result.phone).toBe('+819012345678');
    });

    it('should reject phone without + prefix', () => {
      expect(() => profileUpdateSchema.parse({ phone: '8612345678900' })).toThrow();
    });

    it('should reject phone starting with +0', () => {
      expect(() => profileUpdateSchema.parse({ phone: '+0123456789' })).toThrow();
    });

    it('should reject phone that is just +', () => {
      expect(() => profileUpdateSchema.parse({ phone: '+' })).toThrow();
    });

    it('should reject phone with letters', () => {
      expect(() => profileUpdateSchema.parse({ phone: '+86abc' })).toThrow();
    });

    it('should reject phone over 15 digits (E.164 max)', () => {
      expect(() => profileUpdateSchema.parse({ phone: '+1234567890123456' })).toThrow();
    });

    it('should accept null phone', () => {
      const result = profileUpdateSchema.parse({ phone: null });
      expect(result.phone).toBeNull();
    });

    it('should accept omitted phone', () => {
      const result = profileUpdateSchema.parse({});
      expect(result.phone).toBeUndefined();
    });
  });

  describe('social links', () => {
    const socialFields = ['twitter', 'weibo', 'douyin', 'tiktok', 'instagram'] as const;

    for (const field of socialFields) {
      describe(field, () => {
        it('should accept valid username', () => {
          const result = profileUpdateSchema.parse({ [field]: '@testuser' });
          expect(result[field]).toBe('@testuser');
        });

        it('should accept valid URL', () => {
          const result = profileUpdateSchema.parse({ [field]: 'https://example.com/user' });
          expect(result[field]).toBe('https://example.com/user');
        });

        it('should trim whitespace', () => {
          const result = profileUpdateSchema.parse({ [field]: '  @user  ' });
          expect(result[field]).toBe('@user');
        });

        it('should convert empty string to null', () => {
          const result = profileUpdateSchema.parse({ [field]: '' });
          expect(result[field]).toBeNull();
        });

        it('should convert whitespace-only to null', () => {
          const result = profileUpdateSchema.parse({ [field]: '   ' });
          expect(result[field]).toBeNull();
        });

        it('should accept null', () => {
          const result = profileUpdateSchema.parse({ [field]: null });
          expect(result[field]).toBeNull();
        });

        it('should reject string over 200 chars', () => {
          expect(() => profileUpdateSchema.parse({ [field]: 'a'.repeat(201) })).toThrow();
        });

        it('should accept string of exactly 200 chars', () => {
          const value = 'a'.repeat(200);
          const result = profileUpdateSchema.parse({ [field]: value });
          expect(result[field]).toBe(value);
        });
      });
    }
  });

  describe('combined fields', () => {
    it('should accept all fields at once', () => {
      const input = {
        displayName: 'Test User',
        phone: '+8612345678900',
        twitter: '@test',
        weibo: '@test_weibo',
        douyin: 'douyin_user',
        tiktok: '@tiktok_user',
        instagram: 'https://instagram.com/test',
      };

      const result = profileUpdateSchema.parse(input);

      expect(result.displayName).toBe('Test User');
      expect(result.phone).toBe('+8612345678900');
      expect(result.twitter).toBe('@test');
      expect(result.weibo).toBe('@test_weibo');
      expect(result.douyin).toBe('douyin_user');
      expect(result.tiktok).toBe('@tiktok_user');
      expect(result.instagram).toBe('https://instagram.com/test');
    });

    it('should accept empty object', () => {
      const result = profileUpdateSchema.parse({});
      expect(result).toBeDefined();
    });

    it('should strip unknown fields', () => {
      const result = profileUpdateSchema.parse({ unknownField: 'value' } as any);
      expect((result as any).unknownField).toBeUndefined();
    });
  });
});
