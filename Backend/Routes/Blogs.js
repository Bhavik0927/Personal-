import express from 'express';
import Blog from '../model/blogSchema.js';

const blogRoute = express.Router();

blogRoute.post('/create', async (req, res) => {
    const { title, blog } = req.body;

    const userId = req.user._id;


    if (!title || !blog) {
        return res.status(404).json({ error: 'Every field is mandatory' });
    }
    const newBlog = new Blog({
        title,
        blog,
        createdBy: userId
    });

    await newBlog.save();

    res.status(202).json({ data: newBlog });
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
        console.log(blog);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        if (blog.createdBy.toString() !== req.user._id) {
            return res.status(404).json({ message: 'User is not authorized' })
        }
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'blog is successfully deleted'});

    } catch (error) {
        console.log(error);
    }
})
export default blogRoute;