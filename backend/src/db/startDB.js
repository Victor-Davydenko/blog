import mongoose from 'mongoose';

const startDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog.8jtpg2f.mongodb.net/`);
    console.log('DB started successfully');
  } catch (e) {
    throw new Error(e.message);
  }
};

export { startDB };
