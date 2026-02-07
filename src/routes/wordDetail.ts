import { Router } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { geminiProxy } from '../services/gemini.js';

const router = Router();

router.post(
  '/',
  rateLimit(),
  geminiProxy({
    label: 'WordDetail',
    streamField: 'useStream',
    validate(body) {
      if (!body.word || !body.pos || !body.sentence) {
        throw new Error('缺少必要的参数');
      }
    },
    buildMessages(body) {
      const { word, pos, sentence, furigana, romaji, learningMode = 'intermediate' } = body as {
        word: string;
        pos: string;
        sentence: string;
        furigana?: string;
        romaji?: string;
        learningMode?: string;
      };

      let contextWordInfo = `单词 "${word}" (词性: ${pos}`;
      if (furigana) contextWordInfo += `, 读音: ${furigana}`;
      if (romaji) contextWordInfo += `, 罗马音: ${romaji}`;
      contextWordInfo += `)`;

      let detailPrompt: string;

      if (learningMode === 'beginner') {
        detailPrompt = `在日语句子 "${sentence}" 的上下文中，${contextWordInfo} 的具体含义是什么？请提供基础学习者需要的信息，以严格的JSON对象格式返回，不要包含任何markdown或其他非JSON字符：

{
  "originalWord": "${word}",
  "chineseTranslation": "精确的中文翻译",
  "pos": "${pos}",
  "furigana": "${furigana || ''}",
  "romaji": "${romaji || ''}",
  "dictionaryForm": "辞书形（如果适用）",
  "explanation": "简单易懂的中文解释",
  "jlptLevel": "JLPT等级（N1, N2, N3, N4, N5之一）",
  "frequency": "使用频率（Very High, High, Medium, Low之一）"
}`;
      } else if (learningMode === 'intermediate') {
        detailPrompt = `在日语句子 "${sentence}" 的上下文中，${contextWordInfo} 的具体含义是什么？请提供中级学习者需要的信息，以严格的JSON对象格式返回，不要包含任何markdown或其他非JSON字符：

{
  "originalWord": "${word}",
  "chineseTranslation": "精确的中文翻译",
  "pos": "${pos}",
  "furigana": "${furigana || ''}",
  "romaji": "${romaji || ''}",
  "dictionaryForm": "辞书形（如果适用）",
  "explanation": "详细的中文解释（使用【】高亮关键术语）",
  "jlptLevel": "JLPT等级（N1, N2, N3, N4, N5之一）",
  "frequency": "使用频率（Very High, High, Medium, Low之一）",
  "usageExamples": ["例句1：日文 → 中文翻译", "例句2：日文 → 中文翻译"],
  "grammarNotes": "语法使用说明",
  "culturalNotes": "文化背景说明（如果适用）"
}`;
      } else {
        detailPrompt = `在日语句子 "${sentence}" 的上下文中，${contextWordInfo} 的具体含义是什么？请提供高级学习者需要的完整信息，以严格的JSON对象格式返回，不要包含任何markdown或其他非JSON字符：

{
  "originalWord": "${word}",
  "chineseTranslation": "精确的中文翻译",
  "pos": "${pos}",
  "furigana": "${furigana || ''}",
  "romaji": "${romaji || ''}",
  "dictionaryForm": "辞书形（如果适用）",
  "explanation": "详尽的中文解释（包含语法、词形变化规则、助词用法，使用【】高亮关键术语和 \\n 换行）",
  "jlptLevel": "JLPT等级（N1, N2, N3, N4, N5之一）",
  "frequency": "使用频率（Very High, High, Medium, Low之一）",
  "usageExamples": ["例句1：日文 → 中文翻译", "例句2：日文 → 中文翻译", "例句3：日文 → 中文翻译"],
  "grammarNotes": "详细语法使用说明",
  "culturalNotes": "文化背景说明（如果适用）",
  "etymology": "词源说明（如果适用）"
}`;
      }

      return [{ role: 'user', content: detailPrompt }];
    },
    extraPayload() {
      return { reasoning_effort: 'none' };
    },
  }),
);

export default router;
