import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../Store/UserSlice';
import { persistor } from '../Store/Store';
import { removeBlog } from '../Store/BlogSlice';


const Navbar = () => {
    const user = useSelector((store) => store.user?.user);
    const Navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = async () => {
        await axios.post('http://localhost:4000/logout', { withCredentials: true });
        dispatch(removeUser());
        dispatch(removeBlog());
        persistor.purge();
        Navigate('/home');
    }

    return (
        <div style={{ postition: "sticky", display: 'flex', justifyContent: 'space-between', alignItems: "center", height: '50px', padding: '0px 10px', top: "0", zIndex: "1000", backgroundColor: "#fff" }}>
            <div>Cloud</div>


            {user && <div>Welcome,<span className="font-bold"> {user?.existUser?.firstname || user?.firstname} </span></div>}

            <div>
                {user ?
                    (<Link to='/login'><button onClick={logout} style={{ cursor: 'pointer' }} >Logout</button></Link>)
                    : (
                        <>
                            <Link to='/signup'><button style={{ cursor: 'pointer' }} >Sign up</button></Link>
                            <Link to='/login'><button style={{ cursor: 'pointer' }} >Login</button></Link>
                        </>
                    )}

            </div>
        </div>
    )
}

export default Navbar;