import axios from "axios";
import { useEffect } from "react";

const Home = () => {


    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:4000/view', {
                withCredentials: true,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchBlogs(); }, []);

    return (
        <div>
            <h2>Welcome to Home Page</h2>
        </div>
    )
}

export default Home