import dotenv from 'dotenv';
dotenv.config(); 

import mongoose from 'mongoose';

const uri = process.env.DB_URI; 

const connectDB = async () => {
    try {
        await mongoose.connect(uri); 
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

const database = mongoose.connection;

database.on('error', (error) => {
    console.log('Database error:', error);
});

database.once('connected', () => {
    console.log('Database connected!');
});

connectDB(); 

export default connectDB; 
