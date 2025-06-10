import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userSchema.js';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/Cloudinary.js';

dotenv.config();

const profileRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

profileRoute.get('/profile', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(404).json({ error: 'token is not valid' });
        const decoded_token = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ email: decoded_token.email })
        if (!user) return res.status(404).json({ error: 'user is not found' });

        res.status(200).json(user);


    } catch (error) {
        console.log(error)
    }

});

profileRoute.put('/profile/edit', upload.single('profilePic'), async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstname, lastname, email, } = req.body;

        const updateFields = {};
        if (firstname) updateFields.firstname = firstname;
        if (lastname) updateFields.lastname = lastname;
        if (email) updateFields.email = email;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'profile-pics');
            updateFields.profilePic = result.secure_url;
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true }
        ).select('-password');

        res.status(200).json({ message: 'Profile updated', user: updateUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
})


export default profileRoute;