import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userSchema.js';

dotenv.config();

const profileRoute = express.Router();

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

})


export default profileRoute;