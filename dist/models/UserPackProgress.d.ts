import mongoose, { Document, Types } from 'mongoose';
export type PackStatus = 'locked' | 'available' | 'studying' | 'completed';
export interface IUserPackProgress extends Document {
    userId: Types.ObjectId;
    packId: string;
    status: PackStatus;
    studiedWords: string[];
    wrongWords: string[];
    quizScore: number | null;
    quizAttempts: number;
    completedAt: Date | null;
}
export declare const UserPackProgress: mongoose.Model<IUserPackProgress, {}, {}, {}, mongoose.Document<unknown, {}, IUserPackProgress, {}, {}> & IUserPackProgress & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
