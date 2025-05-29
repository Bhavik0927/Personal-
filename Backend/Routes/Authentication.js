import express from "express";
import bcrypt from 'bcrypt';
import User from "../model/userSchema.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import { uploadToCloudinary } from "../utils/Cloudinary.js";

dotenv.config();

const authRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

authRouter.post("/signup", upload.single('profilePic'), async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    try {
        const result = await uploadToCloudinary(req.file.buffer, 'profile_pics');
        // console.log('Uploaded URL:', result.secure_url);

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(401).json({ message: "User is already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashPassword,
            profilePic: result.secure_url,
        });

        await newUser.save();
        res.status(200).send({ message: "User is created", newUser });
    } catch (error) {
        console.log(error);
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
        return res.status(404).send({ message: "User is Not Exists" })
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);

    if (comparePassword) {
        const token = await jwt.sign({ _id: existUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
            sameSite: 'lax',// or 'None' if cross-site
            maxAge: 24 * 60 * 60 * 1000 // 1 day});
        })
        res.status(200).json({ message: "Login successfully", token: token, existUser });
    }

})

authRouter.post('/logout', async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,         // Same as in login
        sameSite: 'lax',
        path: '/'       // Default value, unless you specify otherwise in login
    });
    res.send("Logout Successfully...");
});

export default authRouter;


