import mongoose, { Schema, Document, Types } from 'mongoose';

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

const userPackProgressSchema = new Schema<IUserPackProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    packId: { type: String, required: true },
    status: { type: String, enum: ['locked', 'available', 'studying', 'completed'], default: 'locked' },
    studiedWords: [{ type: String }],
    wrongWords: [{ type: String }],
    quizScore: { type: Number, default: null },
    quizAttempts: { type: Number, default: 0 },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

userPackProgressSchema.index({ userId: 1, packId: 1 }, { unique: true });
userPackProgressSchema.index({ userId: 1, status: 1 });

export const UserPackProgress = mongoose.model<IUserPackProgress>('UserPackProgress', userPackProgressSchema);
