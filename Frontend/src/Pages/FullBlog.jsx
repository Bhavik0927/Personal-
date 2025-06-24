import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FullBlog = () => {

    const { id } = useParams();
    const getData = async () => {
        console.log(id);
        const fetch = await axios.get(`http://localhost:4000/blog/${id}`,{ withCredentials: true })
        console.log(fetch);

    }

    useEffect(() =>{getData()},[])

    return (
        <div>
            <h2>{id}</h2>
        </div>
    )
}

export default FullBlog;