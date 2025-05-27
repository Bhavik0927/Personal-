import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlogCard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');

    const Navigate = useNavigate();


    const AddBlog = async () => {
        try {
            const res = await axios.post('http://localhost:4000/create', { title, blog }, { withCredentials: true, });
            console.log(res);
            setTitle('');
            setBlog('');
            Navigate('/home')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container"  >



            <div className="modal-overlay">
                <div className="modal-content">
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
                    <div className='close-area'>
                        <button className="close-btn" onClick={AddBlog}>submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddBlogCard