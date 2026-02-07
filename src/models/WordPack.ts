import mongoose, { Schema, Document } from 'mongoose';

export interface IWordPack extends Document {
  packId: string;
  name_zh_CN: string;
  name_en: string;
  description_zh_CN: string;
  category: string;
  jlptLevel: string;
  words: string[];
  order: number;
}

const wordPackSchema = new Schema<IWordPack>({
  packId: { type: String, required: true, unique: true },
  name_zh_CN: { type: String, required: true },
  name_en: { type: String, required: true },
  description_zh_CN: { type: String, default: '' },
  category: { type: String, required: true },
  jlptLevel: { type: String, required: true },
  words: [{ type: String }],
  order: { type: Number, required: true },
});

wordPackSchema.index({ jlptLevel: 1, order: 1 });

export const WordPack = mongoose.model<IWordPack>('WordPack', wordPackSchema);
