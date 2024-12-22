import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
                <a href="/ContactUs" className="item" style={{ color: "white", fontSize: "1.2rem" }}>
                    Contact Us
                </a>
                <div className="right menu">
                    <Link to={"/Login"} style={{ margin: "auto 5px" }}>
                        <button
                            // onClick={handleLoginClick} // Use the handleLoginClick function
                            className="ui button"
                            style={{
                                margin: "auto ", // Adds spacing to the right
                                backgroundColor: "#fbbd08", // Gold
                                color: "white",
                            }}
                        >
                            Login
                        </button>
                    </Link>
                    <Link to={"/Register"} style={{ margin: "auto 5px" }}>
                        <button
                            // onClick={handleRegisterClick} // Use the handleRegisterClick function
                            className="ui primary button"
                            style={{
                                margin: "auto 5px", // Ensures spacing between the two buttons
                                backgroundColor: "#21ba45", // Green
                                color: "white"
                            }}
                        >

                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>


    );
};

export default Header;
