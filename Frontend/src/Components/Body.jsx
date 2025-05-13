import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Body = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <Navbar />
            <div style={{flexGrow:'1',display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:' #f9f9f9'}}>
                <Outlet />
            </div>

        </div>
    )
}

export default Body;