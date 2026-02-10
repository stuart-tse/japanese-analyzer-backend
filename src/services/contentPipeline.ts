import { prisma } from '../config/prisma.js';
import { scrapeUrl } from './contentScraper.js';
import {
  estimateJlptLevel,
  extractVocabulary,
  extractGrammar,
  generateQuestions,
  generateSections,
  generateSimplifiedVersion,
} from './contentAI.js';
import type { ContentStatus, QuestionType } from '../generated/prisma/index.js';

/**
 * Update import job progress. Non-throwing — logs errors silently.
 */
async function updateJobProgress(
  jobId: string,
  status: string,
  progress: number,
  extra?: { error?: string; scrapeResult?: unknown; aiAnalysis?: unknown }
): Promise<void> {
  try {
    await prisma.contentImportJob.update({
      where: { id: jobId },
      data: {
        status,
        progress,
        ...(extra?.error !== undefined ? { error: extra.error } : {}),
        ...(extra?.scrapeResult !== undefined
          ? { scrapeResult: extra.scrapeResult as never }
          : {}),
        ...(extra?.aiAnalysis !== undefined
          ? { aiAnalysis: extra.aiAnalysis as never }
          : {}),
      },
    });
  } catch (err) {
    console.error('Failed to update job progress:', err);
  }
}

/**
 * Process a content item through the full AI pipeline.
 * Runs synchronously (no job queue) — suitable for Lambda.
 */
export async function processContent(contentItemId: string): Promise<void> {
  // Find or create the import job
  const job = await prisma.contentImportJob.findUnique({
    where: { contentItemId },
    include: { contentItem: true },
  });

  if (!job) {
    throw new Error(`No import job found for content item ${contentItemId}`);
  }

  const jobId = job.id;
  const contentItem = job.contentItem;

  try {
    // ─── Step 1: Scrape (10%) ───
    await updateJobProgress(jobId, 'scraping', 5);

    let rawText = contentItem.rawText;
    let title = contentItem.title;

    if (!rawText && job.url) {
      const scrapeResult = await scrapeUrl(job.url);
      rawText = scrapeResult.textContent;
      title = scrapeResult.title || title;

      await prisma.contentItem.update({
        where: { id: contentItemId },
        data: {
          rawText: scrapeResult.textContent,
          cleanedText: scrapeResult.textContent,
          title: scrapeResult.title || title,
          wordCount: scrapeResult.wordCount,
        },
      });

      await updateJobProgress(jobId, 'scraping', 10, {
        scrapeResult: {
          title: scrapeResult.title,
          author: scrapeResult.author,
          siteName: scrapeResult.siteName,
          wordCount: scrapeResult.wordCount,
          excerpt: scrapeResult.excerpt,
        },
      });
    } else {
      await updateJobProgress(jobId, 'scraping', 10);
    }

    // ─── Step 2: Estimate JLPT Level (25%) ───
    await updateJobProgress(jobId, 'analyzing', 15);
    const jlptEstimation = await estimateJlptLevel(rawText);

    await prisma.contentItem.update({
      where: { id: contentItemId },
      data: {
        jlptLevel: jlptEstimation.overallLevel,
        estimatedMinutes: Math.max(1, Math.ceil(rawText.length / 400)),
      },
    });
    await updateJobProgress(jobId, 'analyzing', 25);

    // ─── Step 3: Extract Vocabulary (40%) ───
    await updateJobProgress(jobId, 'analyzing', 30);
    const vocab = await extractVocabulary(rawText);

    await prisma.contentItem.update({
      where: { id: contentItemId },
      data: { extractedVocab: vocab as never },
    });
    await updateJobProgress(jobId, 'analyzing', 40);

    // ─── Step 4: Extract Grammar (55%) ───
    await updateJobProgress(jobId, 'analyzing', 45);
    const grammar = await extractGrammar(rawText);

    await prisma.contentItem.update({
      where: { id: contentItemId },
      data: { extractedGrammar: grammar as never },
    });
    await updateJobProgress(jobId, 'analyzing', 55);

    // ─── Step 5: Generate Sections with Highlights (70%) ───
    await updateJobProgress(jobId, 'generating', 60);
    const sections = await generateSections(rawText, vocab);

    // Delete existing sections then recreate
    await prisma.contentSection.deleteMany({ where: { contentItemId } });
    for (const section of sections) {
      await prisma.contentSection.create({
        data: {
          contentItemId,
          orderIndex: section.orderIndex,
          type: section.type,
          text: section.text,
          vocabHighlights: (section.vocabHighlights ?? []) as never,
          grammarTags: [] as never,
        },
      });
    }
    await updateJobProgress(jobId, 'generating', 70);

    // ─── Step 6: Generate Quiz Questions (85%) ───
    await updateJobProgress(jobId, 'generating', 75);
    const questions = await generateQuestions(rawText, vocab, grammar);

    // Delete existing questions then recreate
    await prisma.generatedQuestion.deleteMany({ where: { contentItemId } });
    for (const q of questions) {
      await prisma.generatedQuestion.create({
        data: {
          contentItemId,
          type: q.type as QuestionType,
          prompt: q.prompt,
          options: q.options ? (q.options as never) : undefined,
          answer: q.answer,
          explanation: q.explanation,
          explanationWrong: q.explanationWrong ? (q.explanationWrong as never) : undefined,
          jlptLevel: q.jlptLevel,
        },
      });
    }
    await updateJobProgress(jobId, 'generating', 85);

    // ─── Step 7: Generate SRS Cards (95%) ───
    await updateJobProgress(jobId, 'generating', 90);

    // Delete existing SRS templates then recreate
    await prisma.generatedSRSItem.deleteMany({
      where: { contentItemId, userId: null },
    });
    for (const v of vocab) {
      await prisma.generatedSRSItem.create({
        data: {
          contentItemId,
          userId: null, // template — not user-specific
          word: v.word,
          furigana: v.furigana,
          pos: v.pos,
          meaningZh: v.meaningZh,
          contextSentence: '',
          cardType: 'vocab',
          jlptLevel: v.jlptLevel,
        },
      });
    }
    await updateJobProgress(jobId, 'generating', 95);

    // ─── Step 8: Generate Simplified Version ───
    const simplifiedText = await generateSimplifiedVersion(
      rawText,
      jlptEstimation.overallLevel === 'N1' || jlptEstimation.overallLevel === 'N2'
        ? 'N3'
        : 'N4'
    );

    await prisma.contentItem.update({
      where: { id: contentItemId },
      data: {
        simplifiedText,
        status: 'DRAFT' as ContentStatus,
      },
    });

    // ─── Done (100%) ───
    await updateJobProgress(jobId, 'done', 100, {
      aiAnalysis: {
        jlptEstimation,
        vocabCount: vocab.length,
        grammarCount: grammar.length,
        questionCount: questions.length,
        sectionCount: sections.length,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown pipeline error';
    console.error(`Content pipeline failed for ${contentItemId}:`, errorMessage);

    await updateJobProgress(jobId, 'failed', job.progress, {
      error: errorMessage,
    });

    await prisma.contentItem.update({
      where: { id: contentItemId },
      data: { status: 'FAILED' as ContentStatus },
    });

    throw error;
  }
}
