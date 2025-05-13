import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    // const Navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("loggedIn") === 'true';
    const token = document.cookie.includes('token');

    if(!token || !isLoggedIn){
        return <Navigate to='/login' replace />
    }
    
    return children;
}

export default ProtectedRoute;