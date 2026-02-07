import mongoose, { Document, Types } from 'mongoose';
export interface ILearningStats extends Document {
    userId: Types.ObjectId;
    totalAnalyses: number;
    totalWordsLearned: number;
    streakDays: number;
    lastActiveDate: Date;
    jlptProgress: Record<string, number>;
    dailyActivity: Array<{
        date: string;
        count: number;
    }>;
    achievements: string[];
}
export declare const LearningStats: mongoose.Model<ILearningStats, {}, {}, {}, mongoose.Document<unknown, {}, ILearningStats, {}, {}> & ILearningStats & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
