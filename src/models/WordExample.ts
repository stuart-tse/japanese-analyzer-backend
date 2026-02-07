import mongoose, { Schema, Document } from 'mongoose';

export interface IWordExample extends Document {
  word: string;
  jlptLevel: string;
  examples: Array<{
    sentence: string;
    furigana: string;
    meaning_zh_CN: string;
  }>;
  generatedAt: Date;
}

const wordExampleSchema = new Schema<IWordExample>({
  word: { type: String, required: true },
  jlptLevel: { type: String, required: true, default: 'N5' },
  examples: [
    {
      sentence: { type: String, required: true },
      furigana: { type: String, required: true },
      meaning_zh_CN: { type: String, required: true },
    },
  ],
  generatedAt: { type: Date, default: Date.now },
});

wordExampleSchema.index({ word: 1, jlptLevel: 1 }, { unique: true });

export const WordExample = mongoose.model<IWordExample>('WordExample', wordExampleSchema);
