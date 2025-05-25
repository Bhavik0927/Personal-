import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import dotenv from 'dotenv';
import authRouter from './Routes/Authentication.js'
import profileRoute from './Routes/Profile.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRoute);

app.listen(PORT, () => {
    connectDB();
    console.log("App is listening")
})