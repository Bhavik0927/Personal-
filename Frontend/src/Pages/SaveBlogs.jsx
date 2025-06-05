import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './saveblog.css';
import SaveBlogCard from '../Components/SaveBlogCard';

const SaveBlogs = () => {

    const [saveBlog, setSaveBlog] = useState([]);

    const fetchSavedBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:4000/savedBlogs', { withCredentials: true });
            console.log(response.data.savedBlogs);
            setSaveBlog(response.data.savedBlogs);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSavedBlogs();
    }, []);

    return (
        <>
            <div className="Card_container" >
                {
                    saveBlog.map((e) => {
                        return (
                            <div key={e._id}>
                                <SaveBlogCard props={e} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SaveBlogs