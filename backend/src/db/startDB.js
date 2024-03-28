import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const startDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog.8jtpg2f.mongodb.net/`);
    logger.info('DB started successfully');
  } catch (e) {
    throw new Error(e.message);
  }
};

export { startDB };
