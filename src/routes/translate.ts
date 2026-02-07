import { Router } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { geminiProxy } from '../services/gemini.js';
import {
  getTranslationCache,
  setTranslationCache,
} from '../services/cacheService.js';

const router = Router();

router.post(
  '/',
  rateLimit(),
  geminiProxy({
    label: 'Translate',
    validate(body) {
      if (!body.text) throw new Error('缺少必要的文本内容');
    },
    buildMessages(body) {
      const text = body.text as string;
      const prompt = `请将以下日文文本翻译成简体中文。

重要要求：
1. 保持与原文完全相同的文本布局和格式
2. 不要在翻译中添加任何换行符或分段
3. 如果原文是一行，翻译也必须是一行
4. 不要重新排版或调整原文的文本结构
5. 仅进行语言翻译，保持格式不变

原文：
${text}

请仅返回翻译后的中文文本，严格保持原文的格式和布局。`;
      return [{ role: 'user', content: prompt }];
    },
    extraPayload() {
      return { reasoning_effort: 'none' };
    },

    // ---- Cache hooks ----
    async cacheGet(body) {
      const text = body.text as string;
      const cached = await getTranslationCache(text);
      if (!cached) return null;
      // Wrap in OpenAI-compatible format for frontend
      return {
        choices: [{ message: { content: cached } }],
        cached: true,
      };
    },
    async cacheSet(body, responseData) {
      const text = body.text as string;
      // For streaming: responseData is the raw content string
      if (typeof responseData === 'string') {
        const trimmed = responseData.trim();
        if (!trimmed) return;
        await setTranslationCache(text, trimmed);
        return;
      }
      // For non-streaming: responseData is the full OpenAI response
      const data = responseData as Record<string, unknown>;
      const choices = data.choices as Array<{ message?: { content?: string } }> | undefined;
      const content = choices?.[0]?.message?.content?.trim();
      if (content) {
        await setTranslationCache(text, content);
      }
    },
    cacheToStreamContent(cachedData) {
      const choices = cachedData.choices as Array<{ message?: { content?: string } }>;
      return choices[0]?.message?.content || '';
    },
  }),
);

export default router;
