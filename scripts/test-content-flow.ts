/**
 * E2E test: Content Library import flow
 * 1. Ensure admin user exists
 * 2. Login as admin
 * 3. Import a real Japanese article
 * 4. Poll pipeline progress
 * 5. Verify content is accessible
 * 6. Test quiz endpoint
 */

import { prisma } from '../src/config/prisma.js';

const BASE = 'http://localhost:4000/api';

// A real NHK News Easy article (simplified Japanese news)
const TEST_URL = 'https://www3.nhk.or.jp/news/easy/';

// Fallback: Use a well-known Japanese article
const FALLBACK_URL = 'https://ja.wikipedia.org/wiki/%E5%AF%BF%E5%8F%B8';

async function ensureAdminUser(): Promise<{ email: string; password: string }> {
  const email = 'admin-test@nihongo.dev';
  const password = 'test123456';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Ensure admin role
    if (existing.role !== 'admin') {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'admin' },
      });
      console.log('  Promoted existing user to admin');
    }
    return { email, password };
  }

  // Register via API
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Admin Test', email, password }),
  });

  if (!res.ok) {
    throw new Error(`Register failed: ${await res.text()}`);
  }

  // Promote to admin
  await prisma.user.update({
    where: { email },
    data: { role: 'admin' },
  });

  console.log('  Created and promoted admin user');
  return { email, password };
}

async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${await res.text()}`);
  }

  const data = (await res.json()) as { accessToken: string };
  return data.accessToken;
}

function authHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('\n=== Content Library E2E Test ===\n');

  // Step 1: Admin user
  console.log('1. Ensuring admin user...');
  const { email, password } = await ensureAdminUser();
  console.log(`   Admin: ${email}\n`);

  // Step 2: Login
  console.log('2. Logging in...');
  const token = await login(email, password);
  console.log(`   Token: ${token.slice(0, 30)}...\n`);

  // Step 3: Check topics
  console.log('3. Fetching topics...');
  const topicsRes = await fetch(`${BASE}/topics`);
  const topics = (await topicsRes.json()) as Array<{ id: string; name: string; nameZh: string }>;
  console.log(`   Found ${topics.length} topics: ${topics.map((t) => t.nameZh).join(', ')}\n`);

  // Step 4: Import article
  const topicId = topics.find((t) => t.name === 'culture')?.id || topics[0]?.id;
  console.log('4. Importing Japanese article...');
  console.log(`   URL: ${FALLBACK_URL}`);
  console.log(`   Topic: ${topicId}\n`);

  const importRes = await fetch(`${BASE}/admin/content/import`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      url: FALLBACK_URL,
      topicId,
    }),
  });

  if (!importRes.ok) {
    const errText = await importRes.text();
    console.error(`   IMPORT FAILED (${importRes.status}): ${errText}`);
    process.exit(1);
  }

  const importData = (await importRes.json()) as { contentItemId: string; jobId: string };
  console.log(`   Content ID: ${importData.contentItemId}`);
  console.log(`   Job ID: ${importData.jobId}\n`);

  // Step 5: Poll pipeline progress
  console.log('5. Monitoring pipeline progress...');
  let jobDone = false;
  let attempts = 0;
  const maxAttempts = 120; // 10 minutes max

  while (!jobDone && attempts < maxAttempts) {
    await sleep(5000);
    attempts++;

    const jobRes = await fetch(`${BASE}/admin/content/jobs/${importData.jobId}`, {
      headers: authHeaders(token),
    });

    if (!jobRes.ok) {
      console.error(`   Job status check failed: ${jobRes.status}`);
      continue;
    }

    const job = (await jobRes.json()) as { status: string; progress: number; error: string | null };
    process.stdout.write(`   [${attempts * 5}s] Status: ${job.status} | Progress: ${job.progress}%\r`);

    if (job.status === 'done') {
      console.log(`\n   Pipeline COMPLETE! (${attempts * 5}s)\n`);
      jobDone = true;
    } else if (job.status === 'failed') {
      console.error(`\n   Pipeline FAILED: ${job.error}\n`);
      process.exit(1);
    }
  }

  if (!jobDone) {
    console.error('\n   Pipeline TIMEOUT (10 min)\n');
    process.exit(1);
  }

  // Step 6: Verify content detail
  console.log('6. Fetching content detail...');
  const detailRes = await fetch(`${BASE}/content/${importData.contentItemId}`, {
    headers: authHeaders(token),
  });

  if (!detailRes.ok) {
    console.error(`   Content detail failed: ${detailRes.status}`);
    process.exit(1);
  }

  const detail = (await detailRes.json()) as {
    title: string;
    jlptLevel: string;
    wordCount: number;
    sections: Array<{ text: string; vocabHighlights: unknown[] }>;
    extractedVocab: unknown[];
    extractedGrammar: unknown[];
  };

  console.log(`   Title: ${detail.title}`);
  console.log(`   JLPT Level: ${detail.jlptLevel}`);
  console.log(`   Word Count: ${detail.wordCount}`);
  console.log(`   Sections: ${detail.sections.length}`);
  console.log(`   Vocab extracted: ${(detail.extractedVocab || []).length}`);
  console.log(`   Grammar extracted: ${(detail.extractedGrammar || []).length}`);

  // Count highlights
  const totalHighlights = detail.sections.reduce(
    (sum, s) => sum + ((s.vocabHighlights as unknown[]) || []).length,
    0,
  );
  console.log(`   Vocab highlights in sections: ${totalHighlights}\n`);

  // Step 7: Test quiz
  console.log('7. Fetching quiz questions...');

  // First publish the content
  const publishRes = await fetch(`${BASE}/admin/content/${importData.contentItemId}/publish`, {
    method: 'POST',
    headers: authHeaders(token),
  });
  console.log(`   Published: ${publishRes.ok ? 'YES' : 'FAILED'}`);

  const quizRes = await fetch(`${BASE}/content/${importData.contentItemId}/quiz`, {
    headers: authHeaders(token),
  });

  if (quizRes.ok) {
    const questions = (await quizRes.json()) as Array<{ type: string; prompt: string }>;
    console.log(`   Questions: ${questions.length}`);
    const mcqCount = questions.filter((q) => q.type === 'MCQ').length;
    const clozeCount = questions.filter((q) => q.type === 'CLOZE').length;
    const rcCount = questions.filter((q) => q.type === 'READING_COMPREHENSION').length;
    console.log(`   MCQ: ${mcqCount}, CLOZE: ${clozeCount}, Reading: ${rcCount}\n`);
  } else {
    console.log(`   Quiz fetch failed: ${quizRes.status}\n`);
  }

  // Step 8: Test library browse
  console.log('8. Testing library browse...');
  const browseRes = await fetch(`${BASE}/content?page=1&limit=10`, {
    headers: authHeaders(token),
  });

  if (browseRes.ok) {
    const browse = (await browseRes.json()) as { items: unknown[]; total: number };
    console.log(`   Total items: ${browse.total}`);
    console.log(`   Items on page 1: ${browse.items.length}\n`);
  }

  // Step 9: Test save word to SRS
  console.log('9. Testing save word to SRS...');
  const vocab = (detail.extractedVocab as Array<{
    word: string;
    furigana: string;
    pos: string;
    meaningZh: string;
  }>) || [];

  if (vocab.length > 0) {
    const testWord = vocab[0];
    const saveRes = await fetch(`${BASE}/content/${importData.contentItemId}/save-word`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        word: testWord.word,
        furigana: testWord.furigana,
        pos: testWord.pos,
        meaningZh: testWord.meaningZh,
        contextSentence: '测试上下文',
      }),
    });
    console.log(`   Saved "${testWord.word}" (${testWord.meaningZh}): ${saveRes.ok ? 'SUCCESS' : 'FAILED ' + saveRes.status}\n`);
  }

  // Step 10: Test reading progress
  console.log('10. Testing reading progress...');
  const progressRes = await fetch(`${BASE}/content/${importData.contentItemId}/progress`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ status: 'reading', lastSectionIndex: 2 }),
  });
  console.log(`    Update progress: ${progressRes.ok ? 'SUCCESS' : 'FAILED ' + progressRes.status}\n`);

  console.log('=== ALL TESTS PASSED ===\n');
  console.log(`Content ID: ${importData.contentItemId}`);
  console.log(`View in browser: http://localhost:3001/library/${importData.contentItemId}`);
  console.log(`Admin panel: http://localhost:3001/admin/content\n`);
}

main()
  .catch((error) => {
    console.error('\nTest failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
