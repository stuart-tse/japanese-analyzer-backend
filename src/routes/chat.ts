import { Router } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { geminiProxy } from '../services/gemini.js';

const SYSTEM_PROMPT = `你是一个专业的日语学习助手。请用中文回答用户关于日语的问题，包括但不限于：

1. 日语语法解释和例句
2. 词汇含义、用法和变位
3. 日语文化和习俗
4. 学习方法和建议
5. 日语句子的翻译和解析
6. 敬语的使用方法
7. 日语考试相关问题

请确保回答：
- 准确专业
- 通俗易懂
- 提供具体例句
- 适合中文母语者学习

如果用户问的不是日语相关问题，请礼貌地引导他们询问日语学习相关的内容。`;

const router = Router();

router.post(
  '/',
  rateLimit(),
  geminiProxy({
    label: 'Chat',
    streamField: 'useStream',
    validate(body) {
      const messages = body.messages;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        throw new Error('缺少消息内容');
      }
    },
    buildMessages(body) {
      const messages = body.messages as Array<{ role: string; content: string }>;
      return [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];
    },
    extraPayload() {
      return { max_tokens: 2000, temperature: 0.7 };
    },
  }),
);

export default router;
