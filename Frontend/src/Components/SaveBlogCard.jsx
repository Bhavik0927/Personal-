import { FaBookmark } from "react-icons/fa";

const SaveBlogCard = ({ props }) => {

    const removeBlog = () =>{
        
    }
    return (
        <div className='save_card' >
            <div className="created_user_container">
                <div className='created_user'>
                    <img className="created_user_icon" src={props?.createdBy?.profilePic} alt="" />
                    <p className="created_user_name">{props?.createdBy?.firstname} {props.createdBy?.lastname}</p>
                </div>
                <div>
                    <p className="bookmark" onClick={() => removeBlog()}> <FaBookmark /> </p>
                </div>

            </div>

            <div className='blog_image'>
                <img src={props?.blogImage} alt="" />
            </div>
            <div className='title_container'>
                <h3>{props?.title}</h3>
            </div>
            <div className='read_btn'>
                <button className='read_more'>Read More</button>
            </div>
        </div>
    )
}

export default SaveBlogCard