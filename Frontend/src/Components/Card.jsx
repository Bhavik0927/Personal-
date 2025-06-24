import { BsStars } from "react-icons/bs";
import { CiBookmarkCheck } from "react-icons/ci";
import axios from "axios";
import { toast } from 'react-toastify';
import './Card.css';
import { FaHandsClapping } from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


const Card = ({ props }) => {

    const user = useSelector(store => store?.user?.user);

    const [likes, setLikes] = useState([...props.likes]);

    const isLiked = likes.includes(user?.existUser?._id);


    const savedBlog = async () => {
        try {
            const response = await axios.post('http://localhost:4000/saveblog', { blogId: props._id }, { withCredentials: true });
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error?.message);
        }

    }

    const LikeIt = async (blogId) => {
        try {
            const response = await axios.put(`http://localhost:4000/like/${blogId}`, {}, { withCredentials: true });
            setLikes(response?.data.likes);

        } catch (error) {
            console.log(error)
        }
    }
    // console.log(props);
    const firstName = props?.createdBy?.firstname.toLowerCase();
    const lastName = props?.createdBy?.lastname.toLowerCase();
    const title = props.title.split(' ').join('-')

    return (
        <>
            <div className="main_card_info">

                <div className="created_user_container">
                    <img className="created_user_icon" src={props?.createdBy?.profilePic} alt="" />
                    <p className="created_user_name">
                        In <span>{props?.subtitle}</span>  created by
                        <span> {props?.createdBy?.firstname} {props.createdBy?.lastname} </span>
                    </p>
                </div>


                <div className="main_content_container">
                    <div className="content_block" >
                        <Link to={`/@${firstName}${lastName}/${title}/${props._id}`}>
                            <h3 className="title">Today I Learned Something About My Boyfriend That No Girl Should Ever Have to   </h3>
                            <p className="paragraph">For the writer who doesn’t think they have anything to offer  and why you're dead wrong
                            </p>
                        </Link>
                    </div>
                    <div className="blog_image">
                        <img src={props?.blogImage} alt="" />
                    </div>
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
                        <span onClick={() => LikeIt(props._id)} className="heart_container">
                            <FaHandsClapping className="heart" style={{ color: isLiked ? 'red' : 'gray' }} />
                            {likes.length}
                        </span>
                    </div>
                    <span className="bookmark" onClick={() => savedBlog()}> <CiBookmarkCheck /> </span>
                </div>
            </div>


        </>
    )
}

export default Card