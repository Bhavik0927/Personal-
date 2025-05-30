import express from 'express';
import Blog from '../model/blogSchema.js';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/Cloudinary.js';

const blogRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

blogRoute.post('/create', upload.single('blogImage'), async (req, res) => {
    const { title, blog } = req.body;

    try {
        const result = await uploadToCloudinary(req.file.buffer, 'blog-pics');

        const userId = req.user._id;

        if (!title || !blog) {
            return res.status(404).json({ error: 'Every field is mandatory' });
        }
        const newBlog = new Blog({
            title,
            blog,
            createdBy: userId,
            blogImage: result.secure_url,
        });

        await newBlog.save();

        res.status(202).json({ data: newBlog });
    } catch (error) {
        console.log(error)
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
        const blogs = await Blog.find().populate('createdBy');

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
    const { title, blog, blogImage } = req.body;

    try {
        if(!title || !blog || !blogImage){
            return res.status(401).send('Every field is required')
        }
        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, { title, blog, blogImage }, { new: true });
        if (!updateBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: updateBlog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
})
export default blogRoute;