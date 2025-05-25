



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree,setAgree] = useState('false');

     const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/signup', { firstname,lastname, email, password }, { withCredentials: "true" });
            console.log(res);
            Navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div style={styles.container}>
            {/* Left Panel */}
            <div style={styles.leftPanel}>
                <div style={styles.logo}>AMU</div>
                <button style={styles.backButton}>Back to website →</button>
                <div style={styles.imageText}>
                    <h2 style={styles.caption}>Capturing Moments, <br />Creating Memories</h2>
                </div>
            </div>

            {/* Right Panel */}
            <div style={styles.rightPanel}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.title}>Create an account</h2>
                    <p style={styles.loginText}>
                        Already have an account? <a href="#" style={styles.link}>Log in</a>
                    </p>

                    <div style={styles.row}>
                        <input
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.inputFull}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.inputFull}
                    />

                    <label style={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={agree}
                            onChange={() => setAgree('checked')}
                            style={styles.checkbox}
                        />
                        <span>I agree to the <a href="#" style={styles.link}>Terms & Conditions</a></span>
                    </label>

                    <button type="submit" style={styles.submitButton}>Create account</button>

                    <div style={styles.divider}>or register with</div>

                    <div style={styles.socials}>
                        <button style={styles.socialBtn}>Google</button>
                        <button style={styles.socialBtn}>Apple</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// 🎨 Inline Styles
const styles = {
    container: {
        display: "flex",
        width: '100vw',
        height: "100vh",
        backgroundColor: "#2e2b3a",
        color: "#fff",
        fontFamily: "sans-serif",
    },
    leftPanel: {
        flex: 1,
        background: "url('https://images.unsplash.com/photo-1587502536263-9298c64b0c53') center/cover no-repeat",
        position: "relative",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    backButton: {
        alignSelf: "flex-end",
        padding: "8px 16px",
        backgroundColor: "#3d3756",
        color: "#fff",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
    },
    imageText: {
        paddingBottom: "40px",
    },
    caption: {
        fontSize: "20px",
        lineHeight: "1.5",
        color: "#fff",
    },
    rightPanel: {
        flex: 1,
        backgroundColor: "#1f1d2b",
        padding: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        width: "100%",
        maxWidth: "400px",
    },
    title: {
        fontSize: "26px",
        marginBottom: "10px",
    },
    loginText: {
        fontSize: "14px",
        marginBottom: "20px",
    },
    link: {
        color: "#a78bfa",
        textDecoration: "none",
    },
    row: {
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #555",
        backgroundColor: "#2e2b3a",
        color: "#fff",
    },
    inputFull: {
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #555",
        backgroundColor: "#2e2b3a",
        color: "#fff",
        marginBottom: "10px",
    },
    checkboxContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        fontSize: "14px",
        gap: "10px",
    },
    checkbox: {
        width: "16px",
        height: "16px",
    },
    submitButton: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#a78bfa",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: "15px",
    },
    divider: {
        textAlign: "center",
        margin: "10px 0",
        color: "#aaa",
        fontSize: "14px",
    },
    socials: {
        display: "flex",
        gap: "10px",
    },
    socialBtn: {
        flex: 1,
        padding: "10px",
        backgroundColor: "#2e2b3a",
        border: "1px solid #555",
        color: "#fff",
        borderRadius: "6px",
        cursor: "pointer",
    },
};

export default Signup;
