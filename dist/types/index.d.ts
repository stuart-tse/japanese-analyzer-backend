export interface TokenData {
    word: string;
    pos: string;
    furigana?: string;
    romaji?: string;
    colorClass?: string;
}
export interface WordDetail {
    originalWord: string;
    chineseTranslation: string;
    pos: string;
    furigana?: string;
    romaji?: string;
    dictionaryForm?: string;
    explanation: string;
    jlptLevel?: string;
    frequency?: string;
    usageExamples?: string[];
    grammarNotes?: string;
    culturalNotes?: string;
    etymology?: string;
}
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
export interface DictEntry {
    word: string;
    furigana: string;
    romaji: string;
    meaning_zh_CN: string;
    jlptLevel: string;
    pos: string;
}
export interface RateLimitConfig {
    maxTokens: number;
    refillRate: number;
}
