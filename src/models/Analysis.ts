import mongoose, { Schema, Document, Types } from 'mongoose';
import type { TokenData } from '../types/index.js';

export interface IAnalysis extends Document {
  userId: Types.ObjectId;
  sentence: string;
  tokens: TokenData[];
  translations: Record<string, string>;
  fullTranslation?: string;
  createdAt: Date;
}

const analysisSchema = new Schema<IAnalysis>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sentence: { type: String, required: true },
    tokens: { type: Schema.Types.Mixed, default: [] },
    translations: { type: Schema.Types.Mixed, default: {} },
    fullTranslation: { type: String },
  },
  { timestamps: true },
);

analysisSchema.index({ userId: 1, createdAt: -1 });
analysisSchema.index({ userId: 1, sentence: 1 });

export const Analysis = mongoose.model<IAnalysis>('Analysis', analysisSchema);
