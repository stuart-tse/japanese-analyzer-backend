import mongoose, { Document, Types } from 'mongoose';
export type SrsStage = 'new' | 'learning' | 'review' | 'mastered';
export interface IVocabulary extends Document {
    userId: Types.ObjectId;
    word: string;
    furigana: string;
    romaji: string;
    meaning_zh_CN: string;
    jlptLevel: string;
    pos: string;
    notes?: string;
    mastered: boolean;
    reviewCount: number;
    lastReviewedAt?: Date;
    srsInterval: number;
    srsEaseFactor: number;
    srsDueDate: Date | null;
    srsStage: SrsStage;
    sourcePackId: string | null;
    wrongCount: number;
    createdAt: Date;
}
export declare const Vocabulary: mongoose.Model<IVocabulary, {}, {}, {}, mongoose.Document<unknown, {}, IVocabulary, {}, {}> & IVocabulary & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
