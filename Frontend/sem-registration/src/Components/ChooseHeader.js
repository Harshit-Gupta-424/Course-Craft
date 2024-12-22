import React from "react";
import Header from "./Header";
import LoginHeader from "./LoginHeader";

const ChooseHeader = ({ onLogout }) => {
    const token = localStorage.getItem("jwtToken"); // Check if JWT token exists

    return (
        <div>
            {token ? (
                <LoginHeader onLogout={onLogout} />
            ) : (
                <Header />
            )}
        </div>
    );
};

export default ChooseHeader;
