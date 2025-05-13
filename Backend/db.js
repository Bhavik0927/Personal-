import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/Personal';
        await mongoose.connect(mongoURI)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;
