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
