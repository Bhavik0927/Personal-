import express from 'express';
import Blog from '../model/blogSchema.js';

const blogRoute = express.Router();

blogRoute.post('/create',async(req,res) =>{
    const {title,blog} = req.body;

    const userId = req.user._id;
    

    if(!title || !blog){
        return res.status(404).json({error:'Every field is mandatory'});
    }
    const newBlog = new Blog({
        title,
        blog,
       createdBy:userId
    });

    await newBlog.save();

    res.status(202).json({data:newBlog});
});

export default blogRoute;