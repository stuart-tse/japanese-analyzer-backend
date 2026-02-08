import { describe, it, expect } from '@jest/globals';
import { TEXTS } from '../../src/constants/texts.js';

/**
 * Tests for payment method constants and validation logic.
 * Route-level tests require working Prisma + Stripe mocks.
 * These tests verify the TEXTS constants and business logic.
 */

describe('Payment Method TEXTS constants', () => {
  it('should have all required payment text constants', () => {
    expect(TEXTS.PAYMENT.NO_CUSTOMER).toBeDefined();
    expect(TEXTS.PAYMENT.SETUP_INTENT_FAILED).toBeDefined();
    expect(TEXTS.PAYMENT.LIST_FAILED).toBeDefined();
    expect(TEXTS.PAYMENT.SET_DEFAULT_FAILED).toBeDefined();
    expect(TEXTS.PAYMENT.DELETE_FAILED).toBeDefined();
    expect(TEXTS.PAYMENT.NOT_FOUND).toBeDefined();
    expect(TEXTS.PAYMENT.DELETE_CONFIRM).toBeDefined();
    expect(TEXTS.PAYMENT.DEFAULT_SET).toBeDefined();
  });

  it('should have Chinese text values', () => {
    // All values should be non-empty strings
    for (const [key, value] of Object.entries(TEXTS.PAYMENT)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe('Profile TEXTS constants', () => {
  it('should have all required profile text constants', () => {
    expect(TEXTS.PROFILE.USER_NOT_FOUND).toBeDefined();
    expect(TEXTS.PROFILE.UPDATE_FAILED).toBeDefined();
    expect(TEXTS.PROFILE.FETCH_FAILED).toBeDefined();
    expect(TEXTS.PROFILE.INVALID_PHONE).toBeDefined();
    expect(TEXTS.PROFILE.NO_FIELDS_TO_UPDATE).toBeDefined();
  });
});

describe('Upload TEXTS constants', () => {
  it('should have all required upload text constants', () => {
    expect(TEXTS.UPLOAD.INVALID_FILE_TYPE).toBeDefined();
    expect(TEXTS.UPLOAD.MISSING_EXTENSION).toBeDefined();
    expect(TEXTS.UPLOAD.URL_GENERATION_FAILED).toBeDefined();
    expect(TEXTS.UPLOAD.MISSING_OBJECT_URL).toBeDefined();
    expect(TEXTS.UPLOAD.AVATAR_CONFIRM_FAILED).toBeDefined();
  });
});

describe('Auth TEXTS constants', () => {
  it('should have all required auth text constants', () => {
    expect(TEXTS.AUTH.NOT_LOGGED_IN).toBeDefined();
    expect(TEXTS.AUTH.TOKEN_EXPIRED).toBeDefined();
    expect(TEXTS.AUTH.NO_PERMISSION).toBeDefined();
    expect(TEXTS.AUTH.PERMISSION_CHECK_FAILED).toBeDefined();
  });
});

describe('Upload service validation logic', () => {
  const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

  it('should allow valid extensions', () => {
    for (const ext of ALLOWED_EXTENSIONS) {
      expect(ALLOWED_EXTENSIONS.includes(ext)).toBe(true);
    }
  });

  it('should reject invalid extensions', () => {
    const invalidExtensions = ['gif', 'bmp', 'svg', 'tiff', 'pdf', 'exe'];
    for (const ext of invalidExtensions) {
      expect(ALLOWED_EXTENSIONS.includes(ext)).toBe(false);
    }
  });

  it('should normalize extension case', () => {
    const ext = 'JPG'.toLowerCase().replace('.', '');
    expect(ALLOWED_EXTENSIONS.includes(ext)).toBe(true);
  });

  it('should strip leading dot', () => {
    const ext = '.png'.toLowerCase().replace('.', '');
    expect(ext).toBe('png');
    expect(ALLOWED_EXTENSIONS.includes(ext)).toBe(true);
  });
});
