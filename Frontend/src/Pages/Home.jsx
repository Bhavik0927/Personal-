import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../Store/BlogSlice";
import { useNavigate } from "react-router-dom";
import './home.css';

const Home = () => {
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user); // user is an array
    const Navigate = useNavigate();


    const [data, setData] = useState([]);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:4000/view', {
                withCredentials: true,
            });
            setData(res.data.data);
            dispatch(addBlog(res.data.data));
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
    }, [user]);

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>

            {
                user ? (
                    data.length > 0 ? (
                        <>
                            <button onClick={() => Navigate('/card')} className="Add_blog">Add Blog</button>
                            <div className="card_container">
                                {
                                    data.map((e, _) => {
                                        return (
                                            <div key={e._id} className="card" >

                                                
                                                <div > <h2>{e.title}</h2> </div>

                                                <div style={{ display: 'flex', flexWrap: 'wrap', wordWrap: 'break-word', }}>
                                                    <p>{e.blog}</p>
                                                </div>
                                                
                                                <div className="name_date_box" >
                                                    <h3>{e?.createdBy?.firstname} {e?.createdBy?.lastname}</h3>
                                                    <h4>{new Date(e.createdAt).toLocaleDateString('en-CA')}</h4>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </>
                    ) : (
                        <h2>Now i can </h2>
                    )
                ) : (
                    <h2>Please login to view content</h2>
                )
            }
        </div>
    );
};

export default Home;
