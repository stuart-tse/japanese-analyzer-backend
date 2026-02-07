import 'express';
import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface User {
      // Standard user properties
      id?: string;
      email?: string;
      provider?: string;

      // OAuth token response properties
      accessToken?: string;
      refreshToken?: string;

      // Allow any additional properties
      [key: string]: any;
    }
  }
}
