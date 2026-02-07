import { Request, Response } from 'express';
export interface GeminiProxyOptions {
    /** Build the messages array for the Gemini/OpenAI-compatible payload */
    buildMessages: (body: Record<string, unknown>) => Array<{
        role: string;
        content: string;
    }>;
    /** Extra payload fields (e.g. reasoning_effort, max_tokens, temperature) */
    extraPayload?: (body: Record<string, unknown>) => Record<string, unknown>;
    /** Which body field signals streaming — defaults to "stream" */
    streamField?: string;
    /** Label for error logs */
    label: string;
    /** Validate required body fields; throw to reject */
    validate?: (body: Record<string, unknown>) => void;
    /** Transform the AI response before sending to client */
    transformResponse?: (data: Record<string, unknown>) => Record<string, unknown>;
}
/**
 * Generic Gemini proxy handler factory.
 * Each route supplies prompt-building logic; this function handles
 * key resolution, SSRF validation, upstream fetch, and response piping.
 */
export declare function geminiProxy(opts: GeminiProxyOptions): (req: Request, res: Response) => Promise<void>;
