import { Request, Response } from 'express';
import { config } from '../config/index.js';
import { validateApiUrl } from '../middleware/validateApiUrl.js';
import { pipeSSE } from './streaming.js';

export interface GeminiProxyOptions {
  /** Build the messages array for the Gemini/OpenAI-compatible payload */
  buildMessages: (body: Record<string, unknown>) => Array<{ role: string; content: string }>;
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
 * Resolve the effective API key.
 * SECURITY: Only use server-side API key, never accept from client headers.
 * This prevents API key exposure in browser DevTools.
 */
function resolveApiKey(req: Request): string {
  // SECURITY FIX: Removed X-Gemini-Key header acceptance to prevent API key exposure
  // Frontend should NEVER send API keys - they must only exist on the server
  return config.apiKey;
}

/**
 * Resolve the effective API URL with SSRF validation.
 */
function resolveApiUrl(bodyApiUrl?: string): { url: string; error?: string } {
  if (!bodyApiUrl) return { url: config.apiUrl };

  const validation = validateApiUrl(bodyApiUrl);
  if (!validation.valid) {
    return { url: '', error: `Invalid API URL: ${validation.error}` };
  }
  return { url: bodyApiUrl };
}

/**
 * Generic Gemini proxy handler factory.
 * Each route supplies prompt-building logic; this function handles
 * key resolution, SSRF validation, upstream fetch, and response piping.
 */
export function geminiProxy(opts: GeminiProxyOptions) {
  return async (req: Request, res: Response) => {
    try {
      const body = req.body as Record<string, unknown>;

      // Validate required fields
      if (opts.validate) {
        try {
          opts.validate(body);
        } catch (e) {
          res.status(400).json({ error: { message: (e as Error).message } });
          return;
        }
      }

      // Resolve API key
      const effectiveApiKey = resolveApiKey(req);
      if (!effectiveApiKey) {
        res.status(500).json({
          error: { message: '未提供API密钥，请在设置中配置API密钥或联系管理员配置服务器密钥' },
        });
        return;
      }

      // Resolve API URL
      const { url: effectiveApiUrl, error: urlError } = resolveApiUrl(
        body.apiUrl as string | undefined,
      );
      if (urlError) {
        res.status(400).json({ error: { message: urlError } });
        return;
      }

      // Build payload
      const streamFieldName = opts.streamField || 'stream';
      const isStream = !!body[streamFieldName];
      const model = (body.model as string) || config.modelName;
      const messages = opts.buildMessages(body);

      const payload: Record<string, unknown> = {
        model,
        messages,
        stream: isStream,
        ...(opts.extraPayload ? opts.extraPayload(body) : {}),
      };

      // Fetch upstream
      const upstreamRes = await fetch(effectiveApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${effectiveApiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!upstreamRes.ok) {
        let data: Record<string, unknown> | null = null;
        try {
          data = (await upstreamRes.json()) as Record<string, unknown>;
        } catch {
          // ignore
        }
        console.error(`AI API error (${opts.label}):`, upstreamRes.status, data);
        const errObj = data?.error as Record<string, unknown> | undefined;
        const message =
          errObj?.message ||
          (data?.message as string) ||
          `上游API返回 ${upstreamRes.status}: ${upstreamRes.statusText}`;
        res.status(upstreamRes.status).json({ error: { message } });
        return;
      }

      // Stream or JSON response
      if (isStream) {
        pipeSSE(upstreamRes, res);
      } else {
        const data = await upstreamRes.json();
        // Apply response transformation if provided
        const finalData = opts.transformResponse ? opts.transformResponse(data as Record<string, unknown>) : data;
        res.json(finalData);
      }
    } catch (error) {
      console.error(`Server error (${opts.label}):`, error);
      res.status(500).json({
        error: { message: error instanceof Error ? error.message : '服务器错误' },
      });
    }
  };
}
