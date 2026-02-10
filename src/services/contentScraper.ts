import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

export interface ScrapeResult {
  title: string;
  author: string | null;
  content: string;
  textContent: string;
  excerpt: string | null;
  siteName: string | null;
  publishedTime: string | null;
  wordCount: number;
}

/**
 * Scrape a URL and extract readable content using Mozilla Readability.
 */
export async function scrapeUrl(url: string): Promise<ScrapeResult> {
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'ja,en;q=0.9,zh;q=0.8',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL (${response.status}): ${url}`);
  }

  const html = await response.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    throw new Error('Failed to extract readable content from URL');
  }

  const textContent = (article.textContent ?? '').trim();

  return {
    title: article.title ?? '',
    author: article.byline ?? null,
    content: article.content ?? '',
    textContent,
    excerpt: article.excerpt ?? null,
    siteName: article.siteName ?? null,
    publishedTime: article.publishedTime ?? null,
    wordCount: textContent.length, // Character count for Japanese
  };
}
