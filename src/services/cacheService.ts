import { createHash } from 'node:crypto';
import { prisma } from '../config/prisma.js';

/**
 * SHA-256 hash of normalized + trimmed text for cache lookups.
 * PostgreSQL unique indexes on @db.Text are limited to ~2700 bytes,
 * so we hash long text to a fixed-length key.
 * NFC normalization ensures identical-looking Unicode sequences produce the same hash.
 */
export function hashText(text: string): string {
  return createHash('sha256').update(text.trim().normalize('NFC')).digest('hex');
}

/** Prisma error code for unique constraint violation */
function isUniqueConstraintError(error: unknown): boolean {
  return (error as { code?: string })?.code === 'P2002';
}

// ============================================
// Analysis Cache
// ============================================

export async function getAnalysisCache(
  inputText: string,
): Promise<{ tokens: unknown } | null> {
  try {
    const row = await prisma.analysisCache.findUnique({
      where: { inputHash: hashText(inputText) },
    });
    if (!row) return null;
    return { tokens: row.result };
  } catch (error) {
    console.error('getAnalysisCache error:', error);
    return null;
  }
}

export async function setAnalysisCache(
  inputText: string,
  tokens: unknown,
): Promise<void> {
  try {
    const hash = hashText(inputText);
    await prisma.analysisCache.upsert({
      where: { inputHash: hash },
      update: { result: tokens as never, generatedAt: new Date() },
      create: {
        inputText: inputText.trim(),
        inputHash: hash,
        result: tokens as never,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) return;
    console.error('setAnalysisCache error:', error);
  }
}

// ============================================
// Word Detail Cache
// ============================================

export async function getWordDetailCache(
  word: string,
  pos: string,
  learningMode: string,
): Promise<Record<string, unknown> | null> {
  try {
    const row = await prisma.wordDetailCache.findUnique({
      where: {
        word_pos_learningMode: { word, pos, learningMode },
      },
    });
    if (!row) return null;
    return row.result as Record<string, unknown>;
  } catch (error) {
    console.error('getWordDetailCache error:', error);
    return null;
  }
}

export async function setWordDetailCache(
  word: string,
  pos: string,
  learningMode: string,
  result: unknown,
): Promise<void> {
  try {
    await prisma.wordDetailCache.upsert({
      where: {
        word_pos_learningMode: { word, pos, learningMode },
      },
      update: { result: result as never, generatedAt: new Date() },
      create: { word, pos, learningMode, result: result as never },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) return;
    console.error('setWordDetailCache error:', error);
  }
}

// ============================================
// Translation Cache
// ============================================

export async function getTranslationCache(
  inputText: string,
): Promise<string | null> {
  try {
    const row = await prisma.translationCache.findUnique({
      where: { inputHash: hashText(inputText) },
    });
    if (!row) return null;
    return row.result;
  } catch (error) {
    console.error('getTranslationCache error:', error);
    return null;
  }
}

export async function setTranslationCache(
  inputText: string,
  result: string,
): Promise<void> {
  try {
    const hash = hashText(inputText);
    await prisma.translationCache.upsert({
      where: { inputHash: hash },
      update: { result, generatedAt: new Date() },
      create: {
        inputText: inputText.trim(),
        inputHash: hash,
        result,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) return;
    console.error('setTranslationCache error:', error);
  }
}

// ============================================
// Grammar Analysis Cache
// ============================================

export async function getGrammarAnalysisCache(
  inputText: string,
): Promise<Record<string, unknown> | null> {
  try {
    const row = await prisma.grammarAnalysisCache.findUnique({
      where: { inputHash: hashText(inputText) },
    });
    if (!row) return null;
    return row.result as Record<string, unknown>;
  } catch (error) {
    console.error('getGrammarAnalysisCache error:', error);
    return null;
  }
}

export async function setGrammarAnalysisCache(
  inputText: string,
  result: unknown,
): Promise<void> {
  try {
    const hash = hashText(inputText);
    await prisma.grammarAnalysisCache.upsert({
      where: { inputHash: hash },
      update: { result: result as never, generatedAt: new Date() },
      create: {
        inputText: inputText.trim(),
        inputHash: hash,
        result: result as never,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) return;
    console.error('setGrammarAnalysisCache error:', error);
  }
}
