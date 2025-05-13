import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../Store/UserSlice";

const Home = () => {

    const Navigate = useNavigate();
    const [count, setCount] = useState(60);
    const dispatch = useDispatch();

    const isLoggedIn = localStorage.getItem("loggedIn") === 'true';

    const logout = async () => {
        await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
        localStorage.removeItem("loggedIn");
        localStorage.removeItem('exploreEndTime');
        Navigate('/');
        dispatch(removeUser());
    }

    

    useEffect(() => {
        if (isLoggedIn) return;

        let endTime = localStorage.getItem('exploreEndTime');
        if (!endTime || isNaN(parseInt(endTime)) || parseInt(endTime) < Date.now()) {
            const newEndTime = Date.now() + 60000;
            localStorage.setItem('exploreEndTime', newEndTime.toString());
            endTime = newEndTime;
        }

        const interval = setInterval(() => {
            const TimeLeft = Math.max(0, parseInt(endTime) - Date.now());
            setCount(Math.ceil(TimeLeft / 1000));

            if (TimeLeft <= 0) {
                clearInterval(interval);
                Navigate('/login');
            }
        }, 1000)

        return () => { clearInterval(interval) }

    }, [Navigate, isLoggedIn]);

    return (
        <div>
            {!isLoggedIn ? <h3>{count}</h3> : <button onClick={logout}>Logout</button>}
            <h2>Welcome to Home Page</h2>
        </div>
    )
}

export default Home