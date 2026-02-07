import mongoose, { Schema } from 'mongoose';
const analysisSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sentence: { type: String, required: true },
    tokens: { type: Schema.Types.Mixed, default: [] },
    translations: { type: Schema.Types.Mixed, default: {} },
    fullTranslation: { type: String },
}, { timestamps: true });
analysisSchema.index({ userId: 1, createdAt: -1 });
analysisSchema.index({ userId: 1, sentence: 1 });
export const Analysis = mongoose.model('Analysis', analysisSchema);
//# sourceMappingURL=Analysis.js.map