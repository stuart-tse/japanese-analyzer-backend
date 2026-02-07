import { Router, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { config } from '../config/index.js';
import { validateApiUrl } from '../middleware/validateApiUrl.js';
import type { TokenData } from '../types/index.js';

const router = Router();

router.post('/', rateLimit(), async (req: Request, res: Response) => {
  try {
    const { tokens, model = config.modelName, apiUrl } = req.body;

    const headerKey = req.headers['x-gemini-key'] as string | undefined;
    const effectiveApiKey = headerKey || config.apiKey;

    if (!effectiveApiKey) {
      res.status(500).json({
        error: { message: '未提供API密钥，请在设置中配置API密钥或联系管理员配置服务器密钥' },
      });
      return;
    }

    let effectiveApiUrl = config.apiUrl;
    if (apiUrl) {
      const validation = validateApiUrl(apiUrl);
      if (!validation.valid) {
        res.status(400).json({ error: { message: `Invalid API URL: ${validation.error}` } });
        return;
      }
      effectiveApiUrl = apiUrl;
    }

    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
      res.status(400).json({ error: { message: '缺少词汇列表' } });
      return;
    }

    const contentTokens = (tokens as TokenData[]).filter(
      (t) => t.pos !== '改行' && t.pos !== '空格',
    );

    if (contentTokens.length === 0) {
      res.json({ translations: {} });
      return;
    }

    const tokenList = contentTokens
      .map(
        (token, index) =>
          `${index + 1}. ${token.word} (${token.pos}${token.furigana ? `, 读音: ${token.furigana}` : ''})`,
      )
      .join('\n');

    const batchPrompt = `请将以下日语词汇批量翻译成简体中文。请按照以下JSON格式返回，不要添加任何markdown或其他格式：

日语词汇列表：
${tokenList}

请返回以下JSON格式的翻译结果：
{
  "${contentTokens[0]?.word}": "中文翻译",
  "${contentTokens[1]?.word}": "中文翻译",
  ...
}

要求：
1. 只返回纯JSON对象，不要任何markdown格式
2. 每个词汇提供准确的中文翻译
3. 保持原始日语词汇作为键名
4. 翻译要简洁准确，不要添加解释`;

    const payload = {
      model,
      reasoning_effort: 'none',
      messages: [{ role: 'user', content: batchPrompt }],
    };

    const upstreamRes = await fetch(effectiveApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${effectiveApiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!upstreamRes.ok) {
      const data = await upstreamRes.json();
      console.error('AI API error (Batch Translation):', data);
      res.status(upstreamRes.status).json({
        error: (data as Record<string, unknown>).error || { message: '批量翻译请求时出错' },
      });
      return;
    }

    const data = (await upstreamRes.json()) as Record<string, unknown>;
    const choices = data.choices as Array<{ message: { content: string } }> | undefined;

    if (choices?.[0]?.message?.content) {
      let responseContent = choices[0].message.content.trim();

      try {
        const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch?.[1]) {
          responseContent = jsonMatch[1];
        }

        responseContent = responseContent.replace(/[`]/g, '').trim();

        if (!responseContent.startsWith('{')) {
          const jsonStart = responseContent.indexOf('{');
          const jsonEnd = responseContent.lastIndexOf('}');
          if (jsonStart !== -1 && jsonEnd !== -1) {
            responseContent = responseContent.substring(jsonStart, jsonEnd + 1);
          }
        }

        const translations: Record<string, string> = JSON.parse(responseContent);

        const validatedTranslations: Record<string, string> = {};
        for (const token of contentTokens) {
          const translation = translations[token.word];
          if (translation && typeof translation === 'string') {
            let clean = translation.trim();
            clean = clean.replace(/[。！？、，]/g, '');
            clean = clean.replace(/["'「」『』]/g, '');
            clean = clean.trim();

            if (clean && !/[\u3040-\u309F\u30A0-\u30FF]/.test(clean)) {
              validatedTranslations[token.word] = clean;
            } else {
              validatedTranslations[token.word] = `${token.word}(待翻译)`;
            }
          } else {
            validatedTranslations[token.word] = `${token.word}(未找到)`;
          }
        }

        res.json({
          translations: validatedTranslations,
          processed: contentTokens.length,
          successful: Object.keys(validatedTranslations).length,
        });
      } catch (parseError) {
        console.error('Failed to parse batch translation JSON:', parseError, responseContent);
        res.status(500).json({ error: { message: '批量翻译结果解析失败' } });
      }
    } else {
      console.error('Unexpected API response structure (Batch Translation):', data);
      res.status(500).json({ error: { message: '批量翻译响应格式错误' } });
    }
  } catch (error) {
    console.error('Server error (Batch Translation):', error);
    res.status(500).json({
      error: { message: error instanceof Error ? error.message : '服务器错误' },
    });
  }
});

export default router;
