import { Response } from 'express';
/**
 * Pipe an upstream SSE response through to the Express client.
 */
export declare function pipeSSE(upstream: globalThis.Response, res: Response): void;
