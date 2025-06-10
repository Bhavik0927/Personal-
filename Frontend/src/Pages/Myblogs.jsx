import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import './myblogs.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Myblogs = () => {

    const [data, setData] = useState([]);
    const [deletedId, setDeletedId] = useState(null);

    const Navigate = useNavigate();

    const fetchBlogs = async () => {
        const response = await axios.get('http://localhost:4000/myblog', { withCredentials: true });
        setData(response?.data);
        console.log(response?.data);
    }

    const handleDelete = async (blogId) => {
        try {
            await axios.delete(`http://localhost:4000/${blogId}`, { withCredentials: true });
            setData((prev) => prev.filter((blog) => blog._id !== blogId));
            setDeletedId(null);
            toast.success("deleted successfully...");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchBlogs() }, []);

    return (
        <div className="card_container">

            {data.length > 0 ? (
                data?.map((e, _) => {
                    return (
                        <div key={e._id} className="card" >
                            <div className="edit-header" style={{ display: 'flex', justifyContent: 'space-between' }} >
                                <div>
                                    <img className="blog-image" src={e?.blogImage} alt="" />
                                    <h2>{e.title}</h2>

                                    <div style={{ fontSize: '25px', display: 'flex', gap: '10px', cursor: 'pointer' }}>
                                        <MdDelete onClick={() => setDeletedId(e._id)} />
                                        <RiEdit2Fill onClick={() => Navigate(`/editBlog/${e._id}`)} />
                                    </div>
                                </div>
                                {
                                    deletedId === e._id && (
                                        <div className="confirm-overlay">
                                            <div className="confirm-card">
                                                <p>Are you sure you want to delete this blog?</p>
                                                <div className="confirm-buttons">
                                                    <button className="confirm-yes" onClick={() => { handleDelete(e._id) }}>Yes </button>
                                                    <button className="confirm-no" onClick={() => setDeletedId(null)}>
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div >
                                <p>{e.blog}</p>
                            </div>

                            <div className="name_date_box" >
                                <h4>{new Date(e.createdAt).toLocaleDateString('en-CA')}</h4>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div className="no-blog">
                    <h1>You don't have any blog...</h1>
                </div>
            )

            }
        </div>
    )
}

export default Myblogs