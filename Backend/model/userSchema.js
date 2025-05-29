import mongoose from "mongoose";
// import isEmail from 'validator/es/lib/isEmail.js';
// import isStrongPassword from 'validator/lib/isStrongPassword';

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: "string",
            required: true
        },
        lastname: {
            type: "string",
            required: true
        },
        email: {
            type: "string",
            required: true,
            unique: 'true',
            lowercase: true,
            trim: true,
            // validate(value) {
            //     if (!isEmail(value)) {
            //         throw new Error("Email is not valid" + value);
            //     }
            // }
        },
        password: {
            type: "string",
            required: true,
            unique: 'true',
            // validate(value) {
            //     if (!isStrongPassword(value)) {
            //         throw new Error("Password is not Strong" + value);
            //     }
            // }
        },
        profilePic: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;