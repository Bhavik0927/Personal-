import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector(state => state.user);
    console.log(user);
    return (
        <div style={{ postition: "sticky", display: 'flex', justifyContent: 'space-between', alignItems: "center", height: '50px', padding: '0px 10px',top:"0",zIndex:"1000",backgroundColor:"#fff" }}>
            <div>Cloud</div>
            <div>
                <Link to=""></Link>
            </div>
            <div>
                <Link to='/signup'><button >Sign up</button></Link>
                <Link to='/login'><button >Login</button></Link>
            </div>
        </div>
    )
}

export default Navbar