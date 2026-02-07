import { config } from '../config/index.js';
import { validateApiUrl } from '../middleware/validateApiUrl.js';
import { pipeSSE } from './streaming.js';
/**
 * Resolve the effective API key.
 * SECURITY: Only use server-side API key, never accept from client headers.
 * This prevents API key exposure in browser DevTools.
 */
function resolveApiKey(req) {
    // SECURITY FIX: Removed X-Gemini-Key header acceptance to prevent API key exposure
    // Frontend should NEVER send API keys - they must only exist on the server
    return config.apiKey;
}
/**
 * Resolve the effective API URL with SSRF validation.
 */
function resolveApiUrl(bodyApiUrl) {
    if (!bodyApiUrl)
        return { url: config.apiUrl };
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
export function geminiProxy(opts) {
    return async (req, res) => {
        try {
            const body = req.body;
            // Validate required fields
            if (opts.validate) {
                try {
                    opts.validate(body);
                }
                catch (e) {
                    res.status(400).json({ error: { message: e.message } });
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
            const { url: effectiveApiUrl, error: urlError } = resolveApiUrl(body.apiUrl);
            if (urlError) {
                res.status(400).json({ error: { message: urlError } });
                return;
            }
            // Build payload
            const streamFieldName = opts.streamField || 'stream';
            const isStream = !!body[streamFieldName];
            const model = body.model || config.modelName;
            const messages = opts.buildMessages(body);
            const payload = {
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
                let data = null;
                try {
                    data = (await upstreamRes.json());
                }
                catch {
                    // ignore
                }
                console.error(`AI API error (${opts.label}):`, upstreamRes.status, data);
                const errObj = data?.error;
                const message = errObj?.message ||
                    data?.message ||
                    `上游API返回 ${upstreamRes.status}: ${upstreamRes.statusText}`;
                res.status(upstreamRes.status).json({ error: { message } });
                return;
            }
            // Stream or JSON response
            if (isStream) {
                pipeSSE(upstreamRes, res);
            }
            else {
                const data = await upstreamRes.json();
                // Apply response transformation if provided
                const finalData = opts.transformResponse ? opts.transformResponse(data) : data;
                res.json(finalData);
            }
        }
        catch (error) {
            console.error(`Server error (${opts.label}):`, error);
            res.status(500).json({
                error: { message: error instanceof Error ? error.message : '服务器错误' },
            });
        }
    };
}
//# sourceMappingURL=gemini.js.map