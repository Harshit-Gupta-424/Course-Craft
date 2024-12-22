import React from "react";
import { useState, useEffect } from "react";
import ChooseHeader from "./ChooseHeader";

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // Remove token from localStorage
        setIsLoggedIn(false); // Update login state
    };

    return (
        <div>
            <ChooseHeader onLogout={handleLogout} />
            <div className="ui fluid container" style={{ padding: "0", width: "100%" }}>
                {/* About Us Content */}
                <div className="ui container" style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}>
                    <div className="ui grid">
                        {/* First Block: Welcome */}
                        <div className="ui eight wide column">
                            <div className="ui segment" style={{ backgroundColor: "#F1F1F1" }}>
                                <h1 className="ui dividing header" style={{ color: "#2E2E2E" }}>
                                    Welcome to Gaanja Phuko University
                                </h1>
                                <p style={{ fontSize: "1.2rem", color: "#595959" }}>
                                    At <b>Gaanja Phuko University (GPU)</b>, we pride ourselves on fostering a dynamic and
                                    inclusive environment that empowers students to excel academically, professionally, and
                                    socially. Located in the heart of an innovative and culturally vibrant community, GPU
                                    combines tradition with modernity to offer a world-class education.
                                </p>
                            </div>
                        </div>

                        {/* Second Block: Vision */}
                        <div className="ui eight wide column">
                            <div className="ui segment" style={{ backgroundColor: "#F1F1F1" }}>
                                <h2 className="ui dividing header" style={{ color: "#1B5E20" }}>
                                    Our Vision
                                </h2>
                                <p style={{ fontSize: "1.2rem", color: "#595959" }}>
                                    To be a globally recognized institution that nurtures talent, encourages innovation, and
                                    contributes to the betterment of society through impactful education and research. We aspire
                                    to create a dynamic learning environment that fosters creativity, critical thinking, and lifelong
                                    learning, enabling students to thrive in an ever-changing world.
                                </p>
                            </div>
                        </div>

                        {/* Third Block: Mission */}
                        <div className="ui eight wide column">
                            <div className="ui segment" style={{ backgroundColor: "#F1F1F1" }}>
                                <h2 className="ui dividing header" style={{ color: "#1B5E20" }}>
                                    Our Mission
                                </h2>
                                <ul className="ui list" style={{ color: "#595959" }}>
                                    <li>Deliver high-quality education that equips students with essential skills.</li>
                                    <li>Foster cutting-edge research addressing global challenges.</li>
                                    <li>
                                        Build a diverse, inclusive, and sustainable community that respects all voices and ideas.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Fourth Block: Why Choose GPU */}
                        <div className="ui eight wide column">
                            <div className="ui segment" style={{ backgroundColor: "#EAEAEA" }}>
                                <h2 className="ui dividing header" style={{ color: "#1B5E20" }}>
                                    Why Choose GPU?
                                </h2>
                                <div className="ui list" style={{ color: "#595959" }}>
                                    <div className="item">
                                        <i className="university icon" style={{ color: "#1B5E20" }}></i>
                                        Diverse learning environment with students from all walks of life.
                                    </div>
                                    <div className="item">
                                        <i className="briefcase icon" style={{ color: "#2C3E50" }}></i>
                                        Career readiness through personalized counseling and placements.
                                    </div>
                                    <div className="item">
                                        <i className="leaf icon" style={{ color: "#1B5E20" }}></i>
                                        Commitment to sustainability and eco-friendly initiatives.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Last Block: Join Us at GPU (Full Width) */}
                    <div className="ui segment" style={{ width: "100%", backgroundColor: "#EAEAEA", marginTop: "30px" }}>
                        <h2 className="ui dividing header" style={{ color: "#2E2E2E" }}>
                            Join Us at GPU!
                        </h2>
                        <p style={{ fontSize: "1.2rem", color: "#595959" }}>
                            At <b>Gaanja Phuko University</b>, we prepare students not just for a degree, but for
                            life. Explore your potential and create a future you’ve always dreamed of with us!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
