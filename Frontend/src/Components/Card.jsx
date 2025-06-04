
import { BsStars } from "react-icons/bs";
import { CiBookmarkCheck } from "react-icons/ci";

const Card = ({ props }) => {

    return (
        <>
            <div className="main_card_info">
                <div className="created_user_container">
                    <img className="created_user_icon" src={props?.createdBy?.profilePic} alt="" />
                    <p className="created_user_name">{props?.createdBy?.firstname} {props.createdBy?.lastname}</p>
                </div>
                <div className="main_content_container">
                    <h3 className="title">Today I Learned Something About My Boyfriend That No Girl Should Ever Have to   </h3>
                    <p className="paragraph">For the writer who doesn’t think they have anything to offer   and why you’re dead wrong
                    </p>
                </div>
                <div className="date_container">
                    <p className="date"> <span className="star">
                        <BsStars /></span>
                        {new Date(props?.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                        })}
                    </p>
                    <span className="bookmark"> <CiBookmarkCheck /> </span>
                </div>
            </div>
            <div className="blog_image">
                <img src={props?.blogImage} alt="" />
            </div>

        </>
    )
}

export default Card