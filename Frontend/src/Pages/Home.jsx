import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../Store/BlogSlice";
// import { useNavigate } from "react-router-dom";
import './home.css';

const Home = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const blog = useSelector((state) => state.blog.blog);


    const [data, setData] = useState([]);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:4000/view', {
                withCredentials: true,
            });
            setData(res?.data?.data);
            dispatch(addBlog(res?.data?.data));
            console.log(res.data.data);
        } catch (error) {
            console.log("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBlogs();
        } else {
            setData([]); // clear blogs when user logs out
        }
    }, [user, blog]);

    return (
        <div>
            {
                user ? (
                    data.length > 0 ? (
                        <div style={{ display: 'flex' }}>
                            <div style={{ position: 'relative', overflow: 'hidden', width: '70%' }}>

                                <div className="card_container">
                                    {
                                        data.map((e, index) => {
                                            const cardClass = index === 0 ? "card full-width" : "card";
                                            const imageClass = index === 0 ? 'image full' : "blog-image";
                                            return (
                                                <div key={e._id} className={cardClass}>
                                                    <div>
                                                        <img src={e.blogImage} alt="blog_image" className={imageClass} />
                                                    </div>
                                                    <div className="Second-card-container">
                                                        <div>
                                                            <h2>{e.title}</h2>
                                                        </div>
                                                        <div>
                                                            <p>{e.blog}</p>
                                                        </div>
                                                        <div>
                                                            <button>Read More </button>
                                                        </div>


                                                        <div className="name_date_box">
                                                            <h3>{e?.createdBy?.firstname} {e?.createdBy?.lastname}</h3>
                                                            <h4>{new Date(e.createdAt).toLocaleDateString('en-CA')}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div style={{ width: '30%' }}>
                                <h2>Right side portion</h2>
                            </div>
                        </div>
                    ) : (
                        <h2>No blogs found. Try adding one!</h2>
                    )
                ) : (
                    <h1>Please login</h1>
                )
            }
        </div>
    );
}

export default Home;
