import mongoose, { Schema, Document, Types } from 'mongoose';

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
  // SRS fields
  srsInterval: number;
  srsEaseFactor: number;
  srsDueDate: Date | null;
  srsStage: SrsStage;
  sourcePackId: string | null;
  wrongCount: number;
  createdAt: Date;
}

const vocabularySchema = new Schema<IVocabulary>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    word: { type: String, required: true },
    furigana: { type: String, default: '' },
    romaji: { type: String, default: '' },
    meaning_zh_CN: { type: String, default: '' },
    jlptLevel: { type: String, default: '' },
    pos: { type: String, default: '' },
    notes: { type: String },
    mastered: { type: Boolean, default: false },
    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date },
    // SRS fields
    srsInterval: { type: Number, default: 0 },
    srsEaseFactor: { type: Number, default: 2.5 },
    srsDueDate: { type: Date, default: null },
    srsStage: { type: String, enum: ['new', 'learning', 'review', 'mastered'], default: 'new' },
    sourcePackId: { type: String, default: null },
    wrongCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

vocabularySchema.index({ userId: 1, word: 1 }, { unique: true });
vocabularySchema.index({ userId: 1, createdAt: -1 });
vocabularySchema.index({ userId: 1, srsStage: 1, srsDueDate: 1 });

export const Vocabulary = mongoose.model<IVocabulary>('Vocabulary', vocabularySchema);
