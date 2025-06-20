import express from 'express';
import Blog from '../model/blogSchema.js';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/Cloudinary.js';
import User from '../model/userSchema.js';
import mongoose from 'mongoose';

const blogRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

blogRoute.post('/create', upload.single('blogImage'), async (req, res) => {

    try {
        const { title,subtitle, blog } = req.body;
        const userId = req.user._id;

        if (!title || !subtitle || !blog || !req.file) {
            return res.status(400).json({ error: 'Title, blog content, and image are required.' });
        }

        const result = await uploadToCloudinary(req.file.buffer, 'blog-pics');

        if (!title || !subtitle ||  !blog) {
            return res.status(404).json({ error: 'Every field is mandatory' });
        }
        const newBlog = new Blog({
            title,
            subtitle,
            blog,
            createdBy: userId,
            blogImage: result.secure_url,
        });

        await newBlog.save();

        res.status(202).json({ message: "Blog created successfully", data: newBlog });
    } catch (error) {
        console.error("Blog creation error:", error);
        res.status(500).json({ error: "Something went wrong while creating the blog" });
    }
});

const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

blogRoute.get('/view', requireAuth, async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const blogs = await Blog.find({ createdBy: { $ne: currentUserId } }).populate('createdBy');

        if (!blogs) {
            return res.status(402).json({ error: "There is no blog available" })
        }

        res.status(200).json({ data: blogs })
    } catch (error) {
        console.log(error);
        res.status(402).json({ error: "There is no blog available" })
    }
})

blogRoute.get('/myblog', async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            res.status(402).send("user is not login..login first")
        }
        const response = await Blog.find({ createdBy: userId });
        if (!response || response.length === 0) {
            res.status(404).send("Blogs are not created yet...");
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
});


blogRoute.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        if (blog.createdBy.toString() !== req.user._id) {
            return res.status(404).json({ message: 'User is not authorized' })
        }
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'blog is successfully deleted' });

    } catch (error) {
        console.log(error);
    }
})

blogRoute.put('/blog/:id', async (req, res) => {

    const { title,subtitle, blog, blogImage } = req.body;

    try {
        if (!title || !subtitle || !blog || !blogImage) {
            return res.status(401).send('Every field is required')
        }
        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, { title,subtitle, blog, blogImage }, { new: true }).lean();
        
        if (!updateBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: updateBlog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


blogRoute.post('/saveblog', async (req, res) => {
    const userId = req.user._id;
    const { blogId } = req.body;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        if (blog.createdBy.toString() === userId) {
            return res.status(400).json({ error: "You cannot save your own blog" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.saveBlogs.includes(blog)) {
            return res.status(400).json({ message: 'Blog already saved' });
        }

        user.saveBlogs.push(blogId);
        await user.save();

        res.status(200).json({ message: 'Blog saved successfully', savedBlogs: user.saveBlogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }


})

blogRoute.post('/unsavedBlog', async (req, res) => {
    const userId = req.user._id;
    const { blogId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ error: 'Invalid blog ID' });
    }

    try {
        const result = await User.updateOne(
            {_id: userId},
            { $pull: {saveBlogs:new mongoose.Types.ObjectId(blogId)}}
        )

        if (result.modifiedCount === 0) { return res.status(400).json({ message: 'Blog not in saved list' }); }

        const updatedUser = await User.findById(userId).select('saveBlogs');

        res.status(200).json({ message: 'Blog unsaved successfully', savedBlogs: updatedUser });

    } catch (error) {
        console.log(error);
    }
})


blogRoute.get('/savedBlogs', async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate({
            path: 'saveBlogs',
            populate: {
                path: 'createdBy',
                select: 'firstname lastname email profilePic'
            }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ savedBlogs: user.saveBlogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }

})

blogRoute.put('/like/:id',async(req,res) =>{
    try {
        const blog = await Blog.findById(req.params.id);
        const userId = await req.user._id;
        
        console.log("blogID =>", blog);
        console.log("userID =>", userId);

        if(!blog.likes.includes(userId)){
            blog.likes.push(userId)
        }else{
            blog.likes.pull(userId);
        }

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Something went wrong"});
    }
})

export default blogRoute;