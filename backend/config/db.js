import mongoose from 'mongoose';

// Fallback to localhost if process.env.MONGO_URI is not set (useful for local development)
const Db_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/login_database';

const ConnectDB = async () => {
  try {
    await mongoose.connect(Db_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

export default ConnectDB;