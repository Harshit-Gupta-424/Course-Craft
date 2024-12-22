import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUs from "./Components/ContactUs";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Courses from "./Components/Courses";
import ApproveCourses from "./Components/ApproveCourses";
import AddCourse from "./Components/AddCourse";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [userEmail, setUserEmail] = useState(""); // Store the logged-in user's email

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token);

    if (token) {
      // Fetch user details to get the email
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
          setUserEmail(data.email); // Set the email from user details

        } catch (error) {
          console.error("Error fetching user details:", error.message);
        }
      };

      fetchUserDetails();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        {isLoggedIn && (
          <Route
            exact
            path="/Courses"
            element={
              userEmail === "admin@gmail.com" ? (
                <ApproveCourses />
              ) : (
                <Courses />
              )
            }
          />
        )}
        {userEmail === "admin@gmail.com" && (<Route exact path="/AddCourse" element={<AddCourse />} />)}
      </Routes>
    </Router>
  );
}

export default App;
