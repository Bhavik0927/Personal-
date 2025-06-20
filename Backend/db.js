import mongoose from "mongoose";

const connectDB = async () => { 
    try {
        // const mongoURI = 'mongodb+srv://bhaviktembhare2:8HI4bUEE1AUDmWUj@cluster0.rhv0uu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        const mongoURI = 'mongodb://localhost:27017/Personal'
        await mongoose.connect(mongoURI)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;


