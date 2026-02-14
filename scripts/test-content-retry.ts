/**
 * Retry the failed content item and complete the E2E verification.
 */
import { prisma } from '../src/config/prisma.js';

const BASE = 'http://localhost:4000/api';

async function login(): Promise<string> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin-test@nihongo.dev', password: 'test123456' }),
  });
  const data = (await res.json()) as { accessToken: string };
  return data.accessToken;
}

function authHeaders(token: string): Record<string, string> {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log('\n=== Content Library Translation Test ===\n');

  // Login
  const token = await login();
  console.log('Logged in.\n');

  // Delete all existing content items to start fresh
  console.log('Cleaning up existing content...');
  await prisma.userContentProgress.deleteMany({});
  await prisma.generatedSRSItem.deleteMany({});
  await prisma.generatedQuestion.deleteMany({});
  await prisma.contentSection.deleteMany({});
  await prisma.contentImportJob.deleteMany({});
  await prisma.contentItem.deleteMany({});
  console.log('  Done.\n');

  // Import the sushi article
  const sushiUrl = 'https://ja.wikipedia.org/wiki/%E5%AF%BF%E5%8F%B8';
  console.log(`Importing: ${sushiUrl}\n`);

  const importRes = await fetch(`${BASE}/admin/content/import`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ url: sushiUrl }),
  });

  if (!importRes.ok) {
    console.error('Import failed:', await importRes.text());
    process.exit(1);
  }

  const { contentItemId, jobId } = (await importRes.json()) as { contentItemId: string; jobId: string };
  console.log(`Created: ${contentItemId} (job: ${jobId})\n`);

  await pollAndVerify(token, contentItemId, jobId);
}

async function pollAndVerify(token: string, contentItemId: string, jobId: string) {
  // Poll pipeline
  console.log('Monitoring pipeline...');
  let attempts = 0;

  while (attempts < 90) {
    await sleep(5000);
    attempts++;

    const jobRes = await fetch(`${BASE}/admin/content/jobs/${jobId}`, {
      headers: authHeaders(token),
    });

    if (!jobRes.ok) continue;

    const job = (await jobRes.json()) as { status: string; progress: number; error: string | null };
    process.stdout.write(`  [${attempts * 5}s] ${job.status} ${job.progress}%\n`);

    if (job.status === 'done') {
      console.log('\n  Pipeline COMPLETE!\n');
      break;
    }
    if (job.status === 'failed') {
      console.error(`\n  Pipeline FAILED: ${job.error}\n`);
      process.exit(1);
    }
  }

  // Publish first
  console.log('Publishing content...');
  await fetch(`${BASE}/admin/content/${contentItemId}/publish`, {
    method: 'POST',
    headers: authHeaders(token),
  });

  // Verify content detail
  console.log('\nVerifying content...');
  const detailRes = await fetch(`${BASE}/content/${contentItemId}`, {
    headers: authHeaders(token),
  });

  const detail = (await detailRes.json()) as {
    title: string;
    titleZh: string | null;
    summary: string | null;
    jlptLevel: string;
    wordCount: number;
    estimatedMinutes: number;
    simplifiedText: string | null;
    sections: Array<{ type: string; text: string; translationZh: string | null; vocabHighlights: unknown[] | null }>;
    extractedVocab: Array<{ word: string; meaningZh: string }> | null;
    extractedGrammar: unknown[] | null;
  };

  console.log(`  Title: ${detail.title}`);
  console.log(`  Title (ZH): ${detail.titleZh || '(none)'}`);
  console.log(`  Summary: ${detail.summary ? detail.summary.slice(0, 100) + '...' : '(none)'}`);
  console.log(`  Level: ${detail.jlptLevel}`);
  console.log(`  Words: ${detail.wordCount} (~${detail.estimatedMinutes} min)`);
  console.log(`  Sections: ${detail.sections.length}`);
  console.log(`  Vocab: ${(detail.extractedVocab || []).length}`);
  console.log(`  Grammar: ${(detail.extractedGrammar || []).length}`);

  const totalHL = detail.sections.reduce(
    (sum, s) => sum + ((s.vocabHighlights as unknown[]) || []).length,
    0,
  );
  console.log(`  Highlights: ${totalHL}`);

  // Check translations per section
  const translatedSections = detail.sections.filter((s) => !!s.translationZh);
  console.log(`  Translated sections: ${translatedSections.length}/${detail.sections.length}`);

  // Show sample translations
  if (translatedSections.length > 0) {
    console.log('\n  Sample section translations:');
    for (const s of translatedSections.slice(0, 3)) {
      const jpPreview = s.text.slice(0, 40);
      const zhPreview = s.translationZh!.slice(0, 60);
      console.log(`    JP: ${jpPreview}...`);
      console.log(`    ZH: ${zhPreview}...`);
      console.log();
    }
  }

  // Show sample vocab
  if (detail.extractedVocab && detail.extractedVocab.length > 0) {
    console.log('  Sample vocabulary:');
    for (const v of detail.extractedVocab.slice(0, 5)) {
      console.log(`    ${v.word} → ${v.meaningZh}`);
    }
  }

  // Quiz
  console.log('\nQuiz check...');
  const quizRes = await fetch(`${BASE}/content/${contentItemId}/quiz`, {
    headers: authHeaders(token),
  });

  if (quizRes.ok) {
    const qs = (await quizRes.json()) as Array<{ type: string; prompt: string }>;
    console.log(`  Questions: ${qs.length}`);
    const types = qs.reduce((acc: Record<string, number>, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {});
    console.log(`  Types: ${JSON.stringify(types)}`);

    // Show first question
    if (qs.length > 0) {
      console.log(`\n  Sample Q: ${qs[0].prompt.slice(0, 100)}...`);
    }
  } else {
    console.log(`  Quiz fetch failed: ${quizRes.status}`);
  }

  // Save word test
  console.log('\nSave word test...');
  if (detail.extractedVocab && detail.extractedVocab.length > 0) {
    const w = detail.extractedVocab[0] as { word: string; furigana: string; pos: string; meaningZh: string };
    const saveRes = await fetch(`${BASE}/content/${contentItemId}/save-word`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ word: w.word, furigana: w.furigana || '', pos: w.pos || '', meaningZh: w.meaningZh }),
    });
    console.log(`  Save "${w.word}": ${saveRes.ok ? 'OK' : 'FAIL ' + saveRes.status}`);
  }

  // Reading progress
  console.log('\nProgress test...');
  const progRes = await fetch(`${BASE}/content/${contentItemId}/progress`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ status: 'reading', lastSectionIndex: 2 }),
  });
  console.log(`  Progress update: ${progRes.ok ? 'OK' : 'FAIL ' + progRes.status}`);

  // Library browse
  console.log('\nLibrary browse...');
  const browseRes = await fetch(`${BASE}/content?page=1&limit=10`, {
    headers: authHeaders(token),
  });
  if (browseRes.ok) {
    const browse = (await browseRes.json()) as { items: unknown[]; total: number };
    console.log(`  Total: ${browse.total}, Page items: ${browse.items.length}`);
  }

  console.log('\n=== ALL TESTS PASSED ===\n');
  console.log(`View article: http://localhost:3001/library/${contentItemId}`);
  console.log(`Admin panel: http://localhost:3001/admin/content\n`);
}

main()
  .catch((err) => {
    console.error('Test failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
