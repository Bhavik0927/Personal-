import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './saveblog.css';
import { FaBookmark } from "react-icons/fa";

const SaveBlogs = () => {

    const [saveBlog, setSaveBlog] = useState([]);

    const fetchSavedBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:4000/savedBlogs', { withCredentials: true });
            setSaveBlog(response.data.savedBlogs);
        } catch (error) {
            console.log(error);
        }
    }

    const removeBlog = async (blogId) => {
        await axios.post('http://localhost:4000/unsavedBlog', { blogId }, { withCredentials: true });

        setSaveBlog(prev => prev.filter(blog => blog._id !== blogId));
        
    }
    useEffect(() => {
        fetchSavedBlogs();
    }, []);

    return (
        <>
            <div className="Card_container" >
                {
                    saveBlog.map((e, _) => {
                        return (

                            <div className='save_card' key={e._id}>
                                <div className="created_user_container">
                                    <div className='created_user'>
                                        <img className="created_user_icon" src={e?.createdBy?.profilePic} alt="" />
                                        <p className="created_user_name">{e?.createdBy?.firstname} {e.createdBy?.lastname}</p>
                                    </div>
                                    <div>
                                        <p className="bookmark" onClick={() => removeBlog(e._id)}> <FaBookmark /> </p>
                                    </div>

                                </div>

                                <div className='blog_image'>
                                    <img src={e?.blogImage} alt="" />
                                </div>
                                <div className='title_container'>
                                    <h3>{e?.title}</h3>
                                </div>
                                <div className='read_btn'>
                                    <button className='read_more'>Read More</button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}

export default SaveBlogs;