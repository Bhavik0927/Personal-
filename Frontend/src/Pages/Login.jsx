import black2 from '../Images/black2.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/UserSlice';
import { toast } from 'react-toastify';


const Login = () => {
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
  };

  const leftPanelStyle = {
    flex: 1,
    backgroundImage: `url(${black2})`, // host your image and replace here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: 'white',
  };

  const superadminButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: '#2C2C2C',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '12px',
  };

  const logoStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    fontSize: '14px',
  };

  const rightPanelStyle = {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px',
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '30px',
    fontWeight: 'bold',
  };

  const labelStyle = {
    fontSize: '14px',
    marginBottom: '5px',
    fontWeight: '500',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '14px',
  };

  const buttonStyle = {
    padding: '15px',
    backgroundColor: '#1F2B2E',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    width: '150px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const footerStyle = {
    marginTop: '20px',
    fontSize: '12px',
  };

  const Navigate = useNavigate();
  const [email, setEmail] = useState('bhaviktembhare2@gmail.com');
  const [password, setPassword] = useState('Bhavik');

  const dispatch = useDispatch();


  const handleLogin = async () => {

    try {
      const res = await axios.post('http://localhost:4000/login', { email, password }, { withCredentials: true });
      // console.log(res)
      dispatch(addUser(res.data));
      toast.success(" Login Successfully");
      Navigate('/')
    } catch (error) {
      console.log(error);
      toast.error('Invalid Credentials...');
    }

  }

  return (
    <div style={containerStyle}>
      <div style={leftPanelStyle}>
        <button style={superadminButtonStyle}>Superadmin Login</button>
        <div style={logoStyle}>
          © Nestvested Limited {new Date().getFullYear()}
        </div>
      </div>

      <div style={rightPanelStyle}>
        <div>
          <h2 style={headerStyle}>Welcome, login to your account.</h2>
          <div>
            <label style={labelStyle}> Email Address:</label>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="name@domain.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Password:</label>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Your Password" style={inputStyle} />
          </div>
          <button style={buttonStyle} onClick={handleLogin}>Sign In Here</button>
          <div style={footerStyle}>
            <a href="#">Lost your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
