import './Signup.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);

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
            Navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='container'>
            {/* Left Panel */}
            <div className='leftPanel'>
                <div className='logo'>AMU</div>
                <button className='backButton'>Back to website →</button>
                <div className='imageText'>
                    <h2 className='caption'>Capturing Moments, <br />Creating Memories</h2>
                </div>
            </div>

            {/* Right Panel */}
            <div className='rightPanel'>
                <form onSubmit={handleSubmit} className='form'>
                    <h2 className='title'>Create an account</h2>
                    <p className='loginText'>
                        Already have an account? <a href="#" className='link'>Log in</a>
                    </p>

                    <div className='row'>
                        <input
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='input'
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            className='input'
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='inputFull'
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='inputFull'
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setProfilePic(e.target.files[0]);
                            setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                        className={{ marginBottom: "10px", color: "#fff" }}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', marginBottom: 10 }}
                        />
                    )}
                    <button type="submit" className='submitButton'>Create account</button>

                    <div className='divider'>or register with</div>

                    <div className='socials'>
                        <button className='socialBtn'>Google</button>
                        <button className='socialBtn'>Apple</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Signup;
