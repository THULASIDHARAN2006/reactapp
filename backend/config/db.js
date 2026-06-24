import mongoose from 'mongoose';

const Db_URI = 'mongodb://localhost:27017/login_database';

const ConnectDB = async () => {
    try {
        await mongoose.connect(Db_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
};

export default ConnectDB;