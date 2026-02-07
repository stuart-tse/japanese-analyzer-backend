import mongoose, { Schema } from 'mongoose';
const vocabularySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    word: { type: String, required: true },
    furigana: { type: String, default: '' },
    romaji: { type: String, default: '' },
    meaning_zh_CN: { type: String, default: '' },
    jlptLevel: { type: String, default: '' },
    pos: { type: String, default: '' },
    notes: { type: String },
    mastered: { type: Boolean, default: false },
    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date },
    // SRS fields
    srsInterval: { type: Number, default: 0 },
    srsEaseFactor: { type: Number, default: 2.5 },
    srsDueDate: { type: Date, default: null },
    srsStage: { type: String, enum: ['new', 'learning', 'review', 'mastered'], default: 'new' },
    sourcePackId: { type: String, default: null },
    wrongCount: { type: Number, default: 0 },
}, { timestamps: true });
vocabularySchema.index({ userId: 1, word: 1 }, { unique: true });
vocabularySchema.index({ userId: 1, createdAt: -1 });
vocabularySchema.index({ userId: 1, srsStage: 1, srsDueDate: 1 });
export const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);
//# sourceMappingURL=Vocabulary.js.map