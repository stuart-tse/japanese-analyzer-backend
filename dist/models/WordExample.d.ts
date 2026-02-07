import mongoose, { Document } from 'mongoose';
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
export declare const WordExample: mongoose.Model<IWordExample, {}, {}, {}, mongoose.Document<unknown, {}, IWordExample, {}, {}> & IWordExample & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
