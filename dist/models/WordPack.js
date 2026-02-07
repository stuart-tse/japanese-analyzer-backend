import mongoose, { Schema } from 'mongoose';
const wordPackSchema = new Schema({
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
export const WordPack = mongoose.model('WordPack', wordPackSchema);
//# sourceMappingURL=WordPack.js.map