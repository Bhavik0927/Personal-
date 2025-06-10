import mongoose from "mongoose";

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
        },
        password: {
            type: "string",
            required: true,
            unique: 'true',
        },
        profilePic: {
            type: String,
            required: true,
        },
        saveBlogs:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Blog'
            }
        ]
    }, { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;