import { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../Store/UserSlice';
import { persistor } from '../Store/Store';
import './Navbar.css';
import { toast } from 'react-toastify';


const Navbar = () => {
    const user = useSelector((store) => store.user?.user);
    console.log(user)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const Navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = async () => {
        await axios.post('http://localhost:4000/logout', null, { withCredentials: true });
        dispatch(removeUser());
        persistor.purge();
        toast.success('Logout successfully...');
        Navigate('/home');
    }

    return (
        <div className='navbar_container'>
            <div onClick={() => { Navigate('/home') }} style={{ cursor: 'pointer' }}>Cloud</div>
            <button onClick={() => Navigate('/card')} className="Add_blog">Add Blog</button>
            <div>
                {user ?

                    (
                        <div >

                            <div className="user-dropdown" ref={dropdownRef}>
                                <p>Welcome {user?.existUser?.firstname || user?.firstname}</p>
                                <img
                                    src={user?.existUser?.profilePic || user?.profilePic }
                                    alt="User"
                                    className="user-icon"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => { Navigate("/myblogs"); setDropdownOpen(false); }}>
                                            My Blogs
                                        </button>
                                        <hr />
                                        <button onClick={() => { Navigate("/edit-profile"); setDropdownOpen(false); }}>
                                            Edit profile
                                        </button>
                                        <hr />
                                        <button onClick={() => { logout(); setDropdownOpen(false); }}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    )
                    : (
                        <div className='profile_btns'>
                            <Link to='/signup'><button className='signup_btn' >Sign up</button></Link>
                            <Link to='/login'><button className='login_btn' >Login</button></Link>
                        </div>
                    )}

            </div>
        </div>
    )
}

export default Navbar;