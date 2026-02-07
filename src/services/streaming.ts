import { Response } from 'express';
import { Readable } from 'node:stream';

/**
 * Pipe an upstream SSE response through to the Express client.
 */
export function pipeSSE(upstream: globalThis.Response, res: Response) {
  if (!upstream.body) {
    res.status(500).json({ error: { message: '流式响应创建失败' } });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  // Convert web ReadableStream to Node Readable and pipe
  const nodeStream = Readable.fromWeb(upstream.body as import('node:stream/web').ReadableStream);
  nodeStream.pipe(res);

  // Clean up on client disconnect
  res.on('close', () => {
    nodeStream.destroy();
  });
}

/**
 * Pipe SSE while collecting content chunks. Calls onComplete with the
 * full concatenated content string after the stream ends.
 */
export function pipeSSEWithCollect(
  upstream: globalThis.Response,
  res: Response,
  onComplete: (content: string) => void,
) {
  if (!upstream.body) {
    res.status(500).json({ error: { message: '流式响应创建失败' } });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const nodeStream = Readable.fromWeb(
    upstream.body as import('node:stream/web').ReadableStream,
  );

  const chunks: string[] = [];

  nodeStream.on('data', (chunk: Buffer) => {
    chunks.push(chunk.toString());
    // Forward chunk to client immediately
    res.write(chunk);
  });

  nodeStream.on('end', () => {
    res.end();
    const content = extractContentFromSSE(chunks.join(''));
    onComplete(content);
  });

  nodeStream.on('error', (err) => {
    console.error('SSE stream error:', err);
    res.end();
  });

  res.on('close', () => {
    nodeStream.destroy();
  });
}

/**
 * Extract the concatenated `content` field from SSE data lines.
 * Handles the OpenAI-compatible SSE format:
 *   data: {"choices":[{"delta":{"content":"..."}}]}
 */
export function extractContentFromSSE(raw: string): string {
  const parts: string[] = [];
  const lines = raw.split('\n');

  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const payload = line.slice(6).trim();
    if (payload === '[DONE]') continue;

    try {
      const parsed = JSON.parse(payload) as {
        choices?: Array<{ delta?: { content?: string } }>;
      };
      const delta = parsed.choices?.[0]?.delta?.content;
      if (delta) parts.push(delta);
    } catch {
      // Skip unparseable lines
    }
  }

  return parts.join('');
}

/**
 * Write a synthetic SSE response for cached content (instant delivery).
 * Mimics OpenAI streaming format so the frontend processes it identically.
 */
export function writeSyntheticSSE(res: Response, content: string) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const chunk = JSON.stringify({
    choices: [{ delta: { content }, finish_reason: 'stop' }],
  });
  res.write(`data: ${chunk}\n\n`);
  res.write('data: [DONE]\n\n');
  res.end();
}
