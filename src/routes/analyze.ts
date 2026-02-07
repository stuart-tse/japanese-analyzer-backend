import { Router } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { optionalAuth } from '../middleware/auth.js';
import { geminiProxy } from '../services/gemini.js';
import { getAnalysisCache, setAnalysisCache } from '../services/cacheService.js';

const ANALYSIS_PROMPT_TEMPLATE = `请对以下日语句子进行详细的词法分析，并以JSON数组格式返回结果。每个对象应包含以下字段："word", "pos", "furigana", "romaji"。

请特别注意以下分析要求：
1. 将助动词与对应动词正确结合。如"食べた"应作为一个单词，而不是分开为"食べ"和"た"。
2. 正确识别动词的时态变化，如"いた"是"いる"的过去时，应作为一个完整单词处理。
3. 合理处理助词，应当与前后词汇适当分离。
4. 避免过度分词，特别是对于构成一个语法或语义单位的组合。
5. 对于复合词，如"持って行く"，根据语义和使用习惯确定是作为一个词还是分开处理。
6. 重要：如果待解析的句子中包含换行符，请在对应的位置输出一个JSON对象：{"word": "\\n", "pos": "改行", "furigana": "", "romaji": ""}.
7. 如果有空格，请输出：{"word": " ", "pos": "空格", "furigana": "", "romaji": ""}.

确保输出是严格的JSON格式，不包含任何markdown或其他非JSON字符。

待解析句子： "{TEXT}"`;

const router = Router();

router.post(
  '/',
  rateLimit(),
  optionalAuth,
  geminiProxy({
    label: 'Analyze',
    validate(body) {
      if (!body.prompt) throw new Error('缺少必要的prompt参数');
    },
    buildMessages(body) {
      const text = body.prompt as string;
      const prompt = ANALYSIS_PROMPT_TEMPLATE.replace('{TEXT}', text);
      return [{ role: 'user', content: prompt }];
    },
    extraPayload() {
      return { reasoning_effort: 'none' };
    },
    transformResponse(data) {
      // Extract content from OpenAI-format response
      const choices = (data.choices as Array<any>) || [];
      if (choices.length > 0 && choices[0].message?.content) {
        const content = choices[0].message.content;
        try {
          // Parse the JSON array from the AI response
          const tokens = JSON.parse(content);
          if (Array.isArray(tokens)) {
            return { tokens };
          }
        } catch (e) {
          console.error('Failed to parse AI response as JSON:', e);
        }
      }
      // Fallback to original response if parsing fails
      return data;
    },

    // ---- Cache hooks ----
    async cacheGet(body) {
      const text = body.prompt as string;
      const cached = await getAnalysisCache(text);
      if (!cached) return null;
      return { ...cached, cached: true };
    },
    async cacheSet(body, responseData) {
      const text = body.prompt as string;
      // For streaming: responseData is the raw content string
      if (typeof responseData === 'string') {
        const trimmed = responseData.trim();
        if (!trimmed) return;
        try {
          const tokens = JSON.parse(trimmed);
          if (Array.isArray(tokens) && tokens.length > 0) {
            await setAnalysisCache(text, tokens);
          }
        } catch {
          // Content wasn't valid JSON tokens — skip caching
        }
        return;
      }
      // For non-streaming: responseData is the transformed { tokens } object
      const data = responseData as Record<string, unknown>;
      if (data.tokens && Array.isArray(data.tokens) && (data.tokens as unknown[]).length > 0) {
        await setAnalysisCache(text, data.tokens);
      }
    },
    cacheToStreamContent(cachedData) {
      return JSON.stringify(cachedData.tokens);
    },
  }),
);

export default router;
