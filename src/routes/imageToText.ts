import { Router, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { config } from '../config/index.js';
import { validateApiUrl } from '../middleware/validateApiUrl.js';
import { pipeSSE } from '../services/streaming.js';

const DEFAULT_GEMINI_VISION_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const DEFAULT_PROMPT =
  '请提取并返回这张图片中的所有日文文字。提取的文本应保持原始格式，但不要输出换行符，用空格替代。不要添加任何解释或说明。';

function detectMimeType(base64: string): string {
  if (base64.startsWith('/9j/')) return 'image/jpeg';
  if (base64.startsWith('iVBORw0KGgo')) return 'image/png';
  if (base64.startsWith('R0lGOD')) return 'image/gif';
  if (base64.startsWith('UklGR')) return 'image/webp';
  return 'image/jpeg';
}

const router = Router();

router.post('/', rateLimit({ maxTokens: 10, refillRate: 0.5 }), async (req: Request, res: Response) => {
  try {
    const { imageData, prompt, apiUrl, stream = false } = req.body;

    const headerKey = req.headers['x-gemini-key'] as string | undefined;
    const effectiveApiKey = headerKey || config.apiKey;

    // Determine effective URL and whether it's the default Gemini Vision endpoint
    let effectiveApiUrl = DEFAULT_GEMINI_VISION_URL;
    let isDefaultGeminiUrl = true;

    // If env API_URL is set and differs from the OpenAI-compat default, use it
    if (
      config.apiUrl &&
      config.apiUrl !== 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
    ) {
      effectiveApiUrl = config.apiUrl;
      isDefaultGeminiUrl = false;
    }

    if (apiUrl) {
      const validation = validateApiUrl(apiUrl);
      if (!validation.valid) {
        res.status(400).json({ error: { message: `Invalid API URL: ${validation.error}` } });
        return;
      }
      effectiveApiUrl = apiUrl;
      isDefaultGeminiUrl = false;
    }

    if (!effectiveApiKey) {
      res.status(500).json({
        error: { message: '未提供API密钥，请在设置中配置API密钥或联系管理员配置服务器密钥' },
      });
      return;
    }

    if (!imageData) {
      res.status(400).json({ error: { message: '缺少必要的图片数据' } });
      return;
    }

    // 10MB base64 limit
    if (imageData.length > 1024 * 1024 * 10) {
      res.status(413).json({ error: { message: '图片数据太大，请压缩后重试' } });
      return;
    }

    const mimeType = detectMimeType(imageData);

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt || DEFAULT_PROMPT },
            { inline_data: { mime_type: mimeType, data: imageData } },
          ],
        },
      ],
    };

    // Build fetch URL & headers
    let fetchUrl: string;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    if (isDefaultGeminiUrl && effectiveApiUrl === DEFAULT_GEMINI_VISION_URL) {
      fetchUrl = `${effectiveApiUrl}?key=${effectiveApiKey}`;
    } else {
      fetchUrl = effectiveApiUrl;
      headers['Authorization'] = `Bearer ${effectiveApiKey}`;
    }

    const upstreamRes = await fetch(fetchUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!upstreamRes.ok) {
      let errorData: Record<string, unknown> | null = null;
      try {
        errorData = (await upstreamRes.json()) as Record<string, unknown>;
      } catch {
        errorData = { message: '无法解析错误响应' };
      }
      console.error('AI API error (Image):', errorData);
      res.status(upstreamRes.status).json({
        error: (errorData?.error as Record<string, unknown>) || { message: '处理图片请求时出错' },
      });
      return;
    }

    if (stream) {
      pipeSSE(upstreamRes, res);
    } else {
      let data: unknown;
      try {
        const responseText = await upstreamRes.text();
        try {
          data = JSON.parse(responseText);
        } catch {
          console.error('Failed to parse API response:', responseText.substring(0, 200) + '...');
          res.status(500).json({ error: { message: '无法解析API响应，请稍后重试' } });
          return;
        }
      } catch (readError) {
        console.error('Failed to read API response:', readError);
        res.status(500).json({ error: { message: '读取API响应时出错，请稍后重试' } });
        return;
      }
      res.json(data);
    }
  } catch (error) {
    console.error('Server error (Image):', error);
    res.status(500).json({
      error: { message: error instanceof Error ? error.message : '服务器错误' },
    });
  }
});

export default router;
