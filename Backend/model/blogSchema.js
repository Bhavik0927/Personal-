import mongoose from 'mongoose';


const BlogSchema = new mongoose.Schema({
    blogImage:{
        type:String,
        required:true
    },
    title:{
        type:'String',
        required:true,
        unique:true
    },
    subtitle:{
        type:'String',
    },
    blog:{
        type:'String',
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

},{timestamps:true});

const Blog = mongoose.model('Blog',BlogSchema);
export default Blog;
