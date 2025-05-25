import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../Store/UserSlice';


const Navbar = () => {
    const user = useSelector((store) => store.user?.user);
    console.log(user);
    const Navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = async () => {
        await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
        Navigate('/home');
        dispatch(removeUser());
    }
   
    return (
        <div style={{ postition: "sticky", display: 'flex', justifyContent: 'space-between', alignItems: "center", height: '50px', padding: '0px 10px', top: "0", zIndex: "1000", backgroundColor: "#fff" }}> 
            <div>Cloud</div>


            {user && <div>Welcome,<span className="font-bold"> {user?.existUser?.firstname || user?.firstname} </span></div>}

            <div>
                {user && <Link to='/login'><button onClick={logout} >Logout</button></Link>}
                <Link to='/signup'><button >Sign up</button></Link>
                <Link to='/login'><button >Login</button></Link>
            </div>
        </div>
    )
}

export default Navbar