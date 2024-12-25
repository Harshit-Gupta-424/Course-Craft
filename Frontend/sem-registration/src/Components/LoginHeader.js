import React from "react";
import { useNavigate } from "react-router-dom";

const LoginHeader = ({onLogout}) => {

    const navigate = useNavigate();
    const handleLogOut = (e) =>{
        e.preventDefault();
        onLogout();
        
        navigate("/")
        window.location.reload();
    }

    return (
        <div className="ui fluid container" style={{ padding: "0" }}>
            <div
                className="ui inverted menu"
                style={{
                    backgroundColor: "#1B1C1D", // Dark Gray background
                    borderRadius: "0",          // Removes rounded corners
                    marginBottom: "20px",
                }}
            >
                <h2 className="header item" style={{ fontSize: "1.5rem", color: "#fbbd08" }}>
                    Gaanja Phuko University
                </h2>
                <a href="/" className="item" style={{ color: "white", fontSize: "1.2rem" }}>
                    Home
                </a>
                <a href="/Courses" className="item" style={{ color: "white", fontSize: "1.2rem" }}>
                    Courses
                </a>
                <a href="/ContactUs" className="item" style={{ color: "white", fontSize: "1.2rem" }}>
                    Contact Us
                </a>
                <div className="right menu">
                        <button
                            onClick={handleLogOut} 
                            className="ui button"
                            style={{
                                margin: "auto 22px", // Adds spacing to the right
                                backgroundColor: "#fbbd08", // Gold
                                color: "white",
                            }}
                        >
                            Log Out
                        </button>
                </div>
            </div>
        </div>


    );
};

export default LoginHeader;
