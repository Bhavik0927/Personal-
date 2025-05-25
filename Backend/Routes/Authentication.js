import express from "express";
import bcrypt from 'bcrypt';
import User from "../model/userSchema.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

 const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
        return res.status(401).json({ message: "User is already exists" })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashPassword
    });

    await newUser.save();
    res.status(200).send({ message: "User is created", newUser });
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });
    
    if (!existUser) {
        return res.status(404).send({ message: "User is Not Exists" })
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);

    if (comparePassword) {
        const token = await jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
             // or 'None' if cross-site
            maxAge: 24 * 60 * 60 * 1000 // 1 day});
        })
        res.status(200).json({ message: "Login successfully", existUser });
    }

})

authRouter.post('/logout', async (req, res) => {
    res.clearCookie('token');
    res.send("Logout Successfully...");
});

export default authRouter;


