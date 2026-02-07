import mongoose from 'mongoose';
import { config } from './index.js';
export async function connectDB() {
    if (!config.mongodbUri) {
        console.warn('MONGODB_URI not set — skipping database connection');
        return;
    }
    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        console.warn('⚠️  Server will continue without MongoDB (some features may be unavailable)');
        // Don't exit - allow server to start without MongoDB for development
    }
}
//# sourceMappingURL=database.js.map