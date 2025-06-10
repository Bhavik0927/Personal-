import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBlog = () => {

    const { id } = useParams();
    const Navigate = useNavigate();
    const blogs = useSelector((state) => state?.blog?.blog || []);

    const blogToEdit = blogs.find((b) => b._id === id);


    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [blogImage, setBlogImage] = useState('');

    useEffect(() => {
        if (blogToEdit) {
            setTitle(blogToEdit.title);
            setBlog(blogToEdit.blog);
            setBlogImage(blogToEdit.blogImage);
        }
    }, [blogToEdit]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = blogImage;

        if (blogImage instanceof File) {

            const formData = new FormData();
            formData.append('file', blogImage);
            formData.append('upload_preset', 'Update_image');

            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/dhx3bmjpg/image/upload', formData)

                imageUrl = res.data.secure_url;
            } catch (error) {
                console.log(error);
                return;
            }
        }

        try {
            const res = await axios.put(`http://localhost:4000/blog/${id}`, {
                title,
                blog,
                blogImage: imageUrl
            }, { withCredentials: true });

            toast.success("blog-data is updated...");
            Navigate('/myblogs')
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>

            <div id="title_area">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    placeholder="Title for blog"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div id="blog_area">
                <label htmlFor="textarea">Blog</label>

                <textarea
                    id="textarea"
                    value={blog}
                    placeholder="Write an blog"
                    onChange={(e) => setBlog(e.target.value)}
                />
            </div>

            <input
                type="file"
                onChange={(e) => {
                    setBlogImage(e.target.files[0]);
                }}
                className={{ marginBottom: "10px", color: "#fff" }}
            />


            <div className='close-area'>
                <button className="close-btn" type='submit' >submit</button>
            </div>
        </form>
    )
}

export default EditBlog