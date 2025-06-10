import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../Store/UserSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.user);
    // console.log(user);

    const fetchUser = async () => {
        if (user) return;

        try {
            const res = await axios.get('http://localhost:4000/profile', { withCredentials: true });
            // console.log(res.data);
            if (res.data) {
                dispatch(addUser(res.data)); 

            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchUser();

    }, []);
    return (
        <div style={{ display: "flex",flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div >
                <Outlet />
            </div>

        </div>
    )
}

export default Body;