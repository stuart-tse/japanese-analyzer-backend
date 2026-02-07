import mongoose, { Document } from 'mongoose';
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
export declare const WordPack: mongoose.Model<IWordPack, {}, {}, {}, mongoose.Document<unknown, {}, IWordPack, {}, {}> & IWordPack & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
