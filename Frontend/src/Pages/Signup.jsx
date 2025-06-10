import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../Pages/Signup.css';

const Signup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePic', profilePic);
        try {
            const res = await axios.post('http://localhost:4000/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, withCredentials: "true"
            });
            console.log(res);
            toast.success("Successfully Sign-up");
            Navigate('/login');
        } catch (error) {
            console.log(error.message);
            toast.error("Something is wrong");
        }
    };

    return (
        // <div className="signup-container">

        //     <form onSubmit={handleSubmit} className="signup-form">
        //         <h2 className='title'>Create an account</h2>
        //         <p className='loginText'>
        //             Already have an account? <a href="#" className='link'>Log in</a>
        //         </p>

        //         <div className='row'>
        //             <input
        //                 type="text"
        //                 placeholder="First name"
        //                 name="firstName"
        //                 value={firstname}
        //                 onChange={(e) => setFirstName(e.target.value)}
        //                 className='input'
        //             />
        //             <input
        //                 type="text"
        //                 placeholder="Last name"
        //                 name="lastname"
        //                 value={lastname}
        //                 onChange={}
        //                 className='input'
        //             />
        //         </div>

        //         <input
        //             type="email"
        //             placeholder="Email"
        //             name="email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             className='inputFull'
        //         />

        //         <input
        //             type="password"
        //             placeholder="Enter your password"
        //             name="password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             className='inputFull'
        //         />

        //         <input
        //             type="file"
        //             accept="image/*"
        //             onChange={(e) => {
        //                 setProfilePic(e.target.files[0]);

        //             }}
        //             className={{ marginBottom: "10px", color: "#fff" }}
        //         />

        //         <button type="submit" className='submitButton'>Create account</button>

        //         <div className='divider'>or register with</div>

        //         <div className='socials'>
        //             <button className='socialBtn'>Google</button>
        //             <button className='socialBtn'>Apple</button>
        //         </div>
        //     </form>
        // </div>
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setProfilePic(e.target.files[0]);
                        }}
                        className={{ marginBottom: "10px", color: "#fff" }}
                    />
                </div>

                <button type="submit" className="submit-btn"> Create Account </button>
            </form>
        </div>
    );
};


export default Signup;
