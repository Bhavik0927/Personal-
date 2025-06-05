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

    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password || !req.file) {
            return res.status(400).json({ message: "All fields including profilePic are required" });
        }


        // Check if user already exists early
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: "User already exists" }); // 409 = Conflict
        }

        const [hashPassword, result] = await Promise.all([
            bcrypt.hash(password, 10),
            uploadToCloudinary(req.file.buffer, 'profile_pics')
        ]);


        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashPassword,
            profilePic: result.secure_url,
        });

        await newUser.save();

        // Do not return password in response
        const { password: _, ...userWithoutPassword } = newUser.toObject();


        res.status(200).send({ message: "User is created", user: userWithoutPassword });
    } catch (error) {
        console.log(error);
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existUser = await User.findOne({ email }).select('+password');

        if (!existUser) {
            return res.status(404).send({ message: "User is Not Exists" })
        }
        const comparePassword = await bcrypt.compare(password, existUser.password);

        if (!comparePassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await jwt.sign({ _id: existUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
            sameSite: 'lax',// or 'None' if cross-site
            maxAge: 24 * 60 * 60 * 1000 // 1 day});
        })
        res.status(200).json({ message: "Login successfully", token: token, existUser });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
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


