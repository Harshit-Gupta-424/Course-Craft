import React, { useState, useEffect } from "react";
import ChooseHeader from "./ChooseHeader";
import CourseItem from "./CourseItem";

const Courses = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsLoggedIn(!!token);

        const fetchUserDetails = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/findUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body: token,
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const data = await response.json();
                setUserDetails(data);
                console.log("User Details:", data);

                // Once user details are fetched, call the addCoursesToUsers API
                // Pass token to the API

            } catch (error) {
                console.error("Error fetching user details:", error.message);
            }
        };

        const addCoursesToUsers = async (token) => {
            try {
                const response = await fetch("http://localhost:8080/course/addCoursesToUsers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",  // Send data as JSON
                    },
                    body: JSON.stringify({ token })  // Send token in the request body
                });

                if (!response.ok) {
                    throw new Error("Failed to add courses to users");
                }

                const data = await response.text();
                console.log("Courses added successfully:", data);

            } catch (error) {
                console.error("Error adding courses:", error.message);
            }
        };

        if (token) {
            fetchUserDetails().then(() => addCoursesToUsers());  // Fetch user details after fetching courses
        }

    }, []);

    useEffect(() => {
        // Check if userDetails and allCourses are both available
        if (userDetails) {
            const filtered = userDetails.courses;

            console.log("Filtered Courses:", filtered);
            setFilteredCourses(filtered); 
        }
    }, [userDetails]);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
    };

    // Function to call the addCoursesToUsers API

    const handleEnroll = async (course) => {

        const email = userDetails.email;
        try {
            const response = await fetch("http://localhost:8080/user/enrollCourse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify JSON content type
                },
                body: JSON.stringify({
                    email: email, // Replace with the actual user email
                    course: course
                }), // Convert the request body to a JSON string
            });

            if (!response.ok) {
                throw new Error("Failed to enroll in the course");
            }

            const data = await response.json();
            console.log("Course enrollment successful:", data);
        } catch (error) {
            console.error("Error during course enrollment:", error.message);
        }

    }

    return (
        <div>
            <ChooseHeader onLogout={handleLogout} />
            <h2 style={headerStyle}>Available Courses</h2>

            <div style={tableContainerStyle}>
                <div style={{ ...rowStyle, fontWeight: "bold", backgroundColor: "#eaeaea" }}>
                    <div style={cellStyle}>S.No</div>
                    <div style={cellStyle}>Degree</div>
                    <div style={cellStyle}>Branch</div>
                    <div style={cellStyle}>Course</div>
                    <div style={cellStyle}>Section</div>
                    <div style={cellStyle}>Professor</div>
                    <div style={cellStyle}>Enroll</div>
                </div>

                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                        <CourseItem key={course.id} course={course} index={index} enroll={handleEnroll} />
                    ))
                ) : (
                    <div>No courses available</div>
                )}
            </div>
        </div>
    );
};

// Styles
const headerStyle = {
    textAlign: "center",
    margin: "20px 0",
};

const tableContainerStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflowX: "auto",
    width: "100%",
};

const rowStyle = {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    alignItems: "center",
    textAlign: "left",
};

const cellStyle = {
    flex: 1,
    padding: "10px",
    minWidth: "120px",
};

export default Courses;

