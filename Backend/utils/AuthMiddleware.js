import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const AuthMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(404).send({ error: 'token not found...!!' })
    }

    try {
        const decoded_Token = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded_Token;
        // console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
    }
}