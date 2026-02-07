import mongoose, { Document, Types } from 'mongoose';
import type { TokenData } from '../types/index.js';
export interface IAnalysis extends Document {
    userId: Types.ObjectId;
    sentence: string;
    tokens: TokenData[];
    translations: Record<string, string>;
    fullTranslation?: string;
    createdAt: Date;
}
export declare const Analysis: mongoose.Model<IAnalysis, {}, {}, {}, mongoose.Document<unknown, {}, IAnalysis, {}, {}> & IAnalysis & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
