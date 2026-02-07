import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILearningStats extends Document {
  userId: Types.ObjectId;
  totalAnalyses: number;
  totalWordsLearned: number;
  streakDays: number;
  lastActiveDate: Date;
  jlptProgress: Record<string, number>;
  dailyActivity: Array<{ date: string; count: number }>;
  achievements: string[];
}

const learningStatsSchema = new Schema<ILearningStats>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalAnalyses: { type: Number, default: 0 },
    totalWordsLearned: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now },
    jlptProgress: { type: Schema.Types.Mixed, default: {} },
    dailyActivity: { type: [{ date: String, count: Number }], default: [] },
    achievements: { type: [String], default: [] },
  },
  { timestamps: true },
);

learningStatsSchema.index({ userId: 1 }, { unique: true });

export const LearningStats = mongoose.model<ILearningStats>('LearningStats', learningStatsSchema);
