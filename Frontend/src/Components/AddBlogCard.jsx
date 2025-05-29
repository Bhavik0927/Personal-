import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBlogCard.css';
import { toast } from 'react-toastify';


const AddBlogCard = () => {

    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [blogImage, setBlogImage] = useState(null);

    const Navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('blog', blog);
        formData.append('blogImage', blogImage);

        try {
            const res = await axios.post('http://localhost:4000/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, withCredentials: true,
            });

            toast.success('Blog created successfully...');
            Navigate('/home')

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="container"  >
            <div className="modal-overlay">
                <div className="modal-content">

                    <form onSubmit={handleSubmit}>
                        <div id='close-card' onClick={() => Navigate('/home')}>
                            <IoClose id='colse-icon' />
                        </div>
                        <div id="title_area">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Title for blog"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div id="blog_area">
                            <label htmlFor="textarea">Blog</label>

                            <textarea
                                id="textarea"
                                placeholder="Write an blog"
                                onChange={(e) => setBlog(e.target.value)}
                            />
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setBlogImage(e.target.files[0]);
                                
                            }}
                            className={{ marginBottom: "10px", color: "#fff" }}
                        />
                        

                        <div className='close-area'>
                            <button className="close-btn" type='submit'>submit</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default AddBlogCard