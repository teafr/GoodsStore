import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect(`${process.env.MONGO_URI}/${process.env.MONGO_DATABASE}`);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

export default connectDB;