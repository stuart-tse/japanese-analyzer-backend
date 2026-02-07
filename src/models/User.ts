import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  provider: 'credentials' | 'google' | 'facebook' | 'phone';
  providerId?: string;
  avatar?: string;
  phone?: string;
  refreshTokenHash?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String },
    provider: {
      type: String,
      enum: ['credentials', 'google', 'facebook', 'phone'],
      default: 'credentials',
    },
    providerId: { type: String },
    avatar: { type: String },
    phone: { type: String },
    refreshTokenHash: { type: String },
    lastLoginAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index(
  { provider: 1, providerId: 1 },
  { unique: true, sparse: true, partialFilterExpression: { providerId: { $exists: true } } },
);

export const User = mongoose.model<IUser>('User', userSchema);
