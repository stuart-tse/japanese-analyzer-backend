import mongoose, { Schema } from 'mongoose';
const learningStatsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalAnalyses: { type: Number, default: 0 },
    totalWordsLearned: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now },
    jlptProgress: { type: Schema.Types.Mixed, default: {} },
    dailyActivity: { type: [{ date: String, count: Number }], default: [] },
    achievements: { type: [String], default: [] },
}, { timestamps: true });
learningStatsSchema.index({ userId: 1 }, { unique: true });
export const LearningStats = mongoose.model('LearningStats', learningStatsSchema);
//# sourceMappingURL=LearningStats.js.map