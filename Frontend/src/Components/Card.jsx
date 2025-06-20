import { BsStars } from "react-icons/bs";
import { CiBookmarkCheck } from "react-icons/ci";
import axios from "axios";
import { toast } from 'react-toastify';
import '../Pages/home.css';
import { GoHeart } from "react-icons/go";
import { useState } from "react";

const Card = ({ props }) => {

    const [likes, setLikes] = useState(props._id);

    const savedBlog = async () => {
        try {
            const response = await axios.post('http://localhost:4000/saveblog', { blogId: props._id }, { withCredentials: true });
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.message);
        }

    }

    console.log(likes);

    const LikeIt = async (blogId) => {
        try {
            const response = await axios.put(`http://localhost:4000/like/${blogId}`, {}, { withCredentials: true });

            console.log(response);

        } catch (error) {
            console.log(error)
        }
    }
    console.log(props);
    // console.log(props._id);

    return (
        <>
            <div className="main_card_info">
                <div className="created_user_container">
                    <img className="created_user_icon" src={props?.createdBy?.profilePic} alt="" />
                    <p className="created_user_name">In <span>{props?.subTitle}</span>  created by {props?.createdBy?.firstname} {props.createdBy?.lastname}</p>
                </div>
                <div className="main_content_container">
                    <h3 className="title">Today I Learned Something About My Boyfriend That No Girl Should Ever Have to   </h3>
                    <p className="paragraph">For the writer who doesn’t think they have anything to offer   and why you’re dead wrong
                    </p>
                </div>
                <div className="date_container">
                    <div className="date_heart_block">
                        <p className="date"> <span className="star">
                            <BsStars /></span>
                            {new Date(props?.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric"
                            })}

                        </p>
                        <span onClick={() => LikeIt(props._id)}><GoHeart className="heart" /></span>
                    </div>
                    <span className="bookmark" onClick={() => savedBlog()}> <CiBookmarkCheck /> </span>
                </div>
            </div>
            <div className="blog_image">
                <img src={props?.blogImage} alt="" />
            </div>

        </>
    )
}

export default Card