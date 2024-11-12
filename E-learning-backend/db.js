// db.js 
import mongoose from 'mongoose';
 // Ensure you have dotenv installed and required
 import dotenv from 'dotenv';
 dotenv.config();
const mongoURI = process.env.Mongodb_Url // MongoDB connection string from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });  
    console.log('MongoDB connected established');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB; // Export the connectDB function
