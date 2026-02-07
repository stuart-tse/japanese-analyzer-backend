import mongoose, { Document } from 'mongoose';
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
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
