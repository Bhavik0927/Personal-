import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../Store/BlogSlice";


const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user); // user is an array
    // console.log("On Home page => ", user);

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
        <div style={{ position: 'relative' }}>
            {
                user ? (
                    data.length > 0 ? (
                        <>
                            <div style={{ display: 'flex', gap: '5px', padding: '2px' }}>

                                {
                                    data.map((e, _) => {
                                        return (
                                            <div key={e.id} style={{ width: '300px', height: '315px', border: '1px solid grey', borderRadius: '10px', padding: '10px' }}>
                                                <div>
                                                    <h2>{e.title}</h2>
                                                </div>
                                                <div>
                                                    <p>{e.blog}</p>
                                                </div>
                                                <div style={{ position: 'absolute', bottom: '30px' }}>
                                                    <h3>{e.createdBy.firstname} {e.createdBy.lastname}</h3>
                                                    <h4>{new Date(e.createdAt).toLocaleDateString('en-CA')}</h4>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button>  </button>
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
