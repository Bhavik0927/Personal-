import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FullBlog.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiHandsClapping } from "react-icons/pi";
import { CiBookmarkCheck, CiLight } from 'react-icons/ci';
import { FiShare } from "react-icons/fi";
import { MdMoreHoriz } from "react-icons/md";
import { toast } from 'react-toastify';
import { LuLink } from "react-icons/lu";
import { GiLinkedRings } from "react-icons/gi";
import PopupCard from '../Components/PopupCard';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const FullBlog = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState();
    const [open, setOpen] = useState(false);
    const [showCard1, setShowCard1] = useState(false);
    const [showCard2, setShowCard2] = useState(false);
    const [customUrl, setCustomUrl] = useState();

    const savedBlog = async () => {
        try {
            const response = await axios.post('http://localhost:4000/saveblog', { blogId: id }, { withCredentials: true });
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.message);
        }

    }

    const handleCopy = () => {
        const text_url = window.location.href;
        navigator.clipboard.writeText(text_url).then(() => {
            toast.success('Url is copied')
            setCustomUrl(text_url);
        }).catch((err) => {
            toast.error("Failed to copy", err);
        })
    }

    useEffect(() => {

        ; (async () => {
            const Response = await axios.get(`http://localhost:4000/blog/${id}`, { withCredentials: true });
            console.log(Response.data.data);
            setBlog(Response?.data?.data);
        })()
    }, [])

    return (
        <div className='fullblog_maincontainer'>
            <div className='fullblog_container'>
                <div> <h1>{blog?.title}</h1>  </div>

                <div className='profile_container'>
                    <div className='blog_image_box'
                        onMouseEnter={() => { setShowCard1(true); }}
                        onMouseLeave={() => { setShowCard1(false) }}
                    >

                        {showCard1 && (
                            <div className='hover_popup1'>
                                <PopupCard blog={blog} />
                            </div>

                        )}
                        <img className='profile_img' src={blog?.createdBy?.profilePic} alt="" />
                    </div>


                    <div
                        onMouseEnter={() => { setShowCard2(true); }}
                        onMouseLeave={() => { setShowCard2(false) }}
                    >
                        {showCard2 && (
                            <div className='hover_popup2'>
                                <PopupCard blog={blog} />
                            </div>
                        )}
                        <Link>{blog?.createdBy?.firstname} {blog?.createdBy?.lastname}</Link>
                    </div>

                    <button>Follow</button>
                    <p>5 min Read </p>
                    .
                    <p>
                        {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                        })}
                    </p>
                </div>

                <div className='like-save_container'>
                    <p> <PiHandsClapping /> {blog?.likes?.length} </p>

                    <div className='share-container'>
                        <p onClick={() => savedBlog()}><CiBookmarkCheck /></p>
                        <div className='share-btn'>
                            
                            {open && (
                                <div className="share-dropdown">
                                    <Link onClick={handleCopy} className="share-option"> <LuLink />  Copy Link</Link>
                                    <Link className="share-option"> <GiLinkedRings />  Friend Link </Link>

                                    <Link
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(customUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="share-option"
                                    >
                                        <FaSquareXTwitter className='icon' />
                                        Share on Twitter
                                    </Link>
                                    <Link
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(customUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="share-option"
                                    >
                                        <FaFacebookSquare className='icon' />
                                        Share on Facebook
                                    </Link>
                                    <Link
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(customUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="share-option"
                                    >
                                        <FaLinkedin className='icon' />
                                        Share on Linkedin
                                    </Link>
                                </div>
                            )}
                            <FiShare onClick={() => setOpen(!open)} />
                        </div>
                        <p><MdMoreHoriz /> </p>
                    </div>
                </div>

                <img className='blog_img' src={blog?.blogImage} alt="" />
                <div className='illustrate_block'>
                    <p>Illustrations by <Link> {blog?.createdBy?.firstname} {blog?.createdBy?.lastname} </Link>
                    </p>
                </div>
                <p className='blog_paragraph'>{blog?.blog}</p>
            </div>
        </div>
    )
}

export default FullBlog;