import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import User from './model/userSchema.js';
import bcrypt from 'bcrypt';
import connectDB from './db.js';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {

    const { firstname,lastname, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
        return res.status(401).json({ message: "User is already exists" })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser =  new User({
        firstname,
        lastname,
        email,
        password: hashPassword
    });

    await newUser.save();
    res.status(200).send({message:"User is created",newUser});
})

app.post('/login',async (req,res) =>{
    const {email,password} = req.body;
    
    const existUser = await User.findOne({email});
    if(!existUser){
        return res.status(404).send({message:"User is Not Exists"})
    }
    const comparePassword = await bcrypt.compare(password,existUser.password);
    
    if(comparePassword){
        const token = await jwt.sign({email},"hdbvsdvbsjv",{expiresIn:'1d'});

        res.cookie("token",token);
        res.status(200).json({message:"Login successfully",existUser});
    }

})

app.post('/logout',async(req,res) =>{
    res.clearCookie('token');
    res.send("Logout Successfully...");
})

app.listen("3000", () => {
    connectDB();
    console.log("App is listening")
})