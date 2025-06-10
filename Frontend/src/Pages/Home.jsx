import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../Store/BlogSlice";
import './home.css';
import HomeDesign from "./HomeDesign";
import Card from "../Components/Card";

const Home = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);


    const [data, setData] = useState([]);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:4000/view', {
                withCredentials: true,
            });
            setData(res?.data?.data);
            dispatch(addBlog(res?.data?.data));
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
        <div >
            {
                user ? (
                    data.length > 0 ? (
                        <div className="main_container">
                            <div className="left_container">
                                <div className="Card_container" >
                                    {
                                        data.map((e, _) => {
                                            return (
                                                <div key={e._id} className="card">
                                                    <Card props={e} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            
                            <div className="right_container">
                                <h2>Right side portion</h2>
                            </div>
                        </div>
                    ) : (
                        <h2>No blogs found. Try adding one!</h2>
                    )
                ) : (
                    <HomeDesign />
                )
            }
        </div>
    );
}

export default Home;
