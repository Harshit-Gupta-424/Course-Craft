import React, { useState, useEffect } from "react";
import ChooseHeader from "./ChooseHeader";
import { useNavigate } from "react-router";
import ApproveCourseItems from "./ApproveCourseItem";
import Switch from "react-switch";

const ApproveCourses = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCoursesAdded, setIsCoursesAdded] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false);
    const [originalUsers, setOriginalUsers] = useState([]); // New state to store the unsorted list
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsLoggedIn(!!token);

        const addCoursesToUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/course/addCoursesToUsers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to add courses to users");
                }

                const data = await response.text();
                console.log(data);
                setIsCoursesAdded(true);
            } catch (error) {
                console.error("Error adding courses:", error.message);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/course/findAllUsers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    if (response.status === 204) {
                        setError("No users found.");
                        setUsers([]);
                        return;
                    }
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);
                setOriginalUsers(data); // Store the original unsorted list
                setFilteredUsers(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching users:", error.message);
                setError("Failed to fetch users. Please try again later.");
            }
        };

        if (!isCoursesAdded) {
            addCoursesToUsers();
        }
        fetchUsers();
    }, [isCoursesAdded]);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
    };

    const handleAddCourse = (e) => {
        e.preventDefault();
        navigate("/AddCourse");
    };

    const handleResponse = async (course, response, user) => {
        const email = user.email;
        try {
            const requestResponse = await fetch("http://localhost:8080/course/respondCourse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    course: course,
                    response: response,
                }),
            });

            if (!requestResponse.ok) {
                throw new Error("Failed to approve/reject the course");
            }

            const data = await requestResponse.json();
            console.log("Course approval/rejection successful:", data);
        } catch (error) {
            console.error("Error during course approval/rejection:", error.message);
        }
    };

    const findWaitingCourses = (courses) => {
        let count = 0;
        for (const course of courses) {
            if (course.hasOwnProperty("status") && course.status === "waiting") {
                count++;
            }
        }
        return count;
    };

    const findCourses = (courses) => {
        let count = 0;
        for (const course of courses) {
            if (course.hasOwnProperty("status") && course.status !== "") {
                count++;
            }
        }
        return count;
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        // Filter users based on the search query and the toggle state
        const filtered = users.filter(
            (user) =>
                (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
        );
        
        // Apply sorting if toggle is checked
        if (checked) {
            const sorted = [...filtered].sort((a, b) => {
                const waitingA = findWaitingCourses(a.courses);
                const waitingB = findWaitingCourses(b.courses);
                return waitingB - waitingA; // Descending order
            });
            setFilteredUsers(sorted);
        } else {
            setFilteredUsers(filtered);
        }
    };

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);

        // Sort users by "waiting" courses in descending order if checked
        if (nextChecked) {
            const sorted = [...filteredUsers].sort((a, b) => {
                const waitingA = findWaitingCourses(a.courses);
                const waitingB = findWaitingCourses(b.courses);
                return waitingB - waitingA; // Descending order
            });
            setFilteredUsers(sorted);
        } else {
            // Reset to the original unsorted list if toggle is off
            const filtered = originalUsers.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };

    return (
        <div>
            <ChooseHeader onLogout={handleLogout} />
            <div style={headerContainerStyle}>
                <div style={searchContainerStyle}>
                    <i className="ui search icon" style={searchIconStyle}></i>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={handleSearch}
                        style={searchBarStyle}
                    />
                </div>
                <h2 style={headerStyle}>Approve Courses</h2>
                <button style={addCourseButtonStyle} onClick={handleAddCourse}>
                    <i className="plus icon" style={{ marginRight: "8px" }}></i>
                    <b style={{ fontSize: "16px" }}>Add Course</b>
                </button>
            </div>

            <div style={tableContainerStyle}>
                <div style={{ ...rowStyle, fontWeight: "bold", backgroundColor: "#eaeaea" }}>
                    <div style={cellStyle}>S.No</div>
                    <div style={cellStyle}>Degree</div>
                    <div style={cellStyle}>Branch</div>
                    <div style={cellStyle}>Course</div>
                    <div style={cellStyle}>Section</div>
                    <div style={cellStyle}>Professor</div>
                    <div style={cellStyle}>Response</div>
                </div>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "fit-content",
                height: "auto",
                margin: "15px",
                marginLeft: "1271px",
                padding: "5px 20px",
            }}>
                <span style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#333",
                }}>
                    Sort by requests
                </span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    offColor="#ddd"
                    onColor="#4CAF50"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    width={40}
                    height={20}
                />
            </div>

            <div style={tableContainerStyle}>
                {error && <div style={{ padding: "10px", color: "red" }}>{error}</div>}

                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => {
                        const count = findCourses(user.courses);
                        return (
                            user.name === "Admin" || user.courses.length === 0 || count === 0 ? null : (
                                <div key={user.id} style={userCardStyle}>
                                    <div style={userDetailsStyle}>
                                        <i className="user icon" style={{ position: "relative", bottom: "4px", fontSize: "15px", marginRight: "8px" }}></i>
                                        <div style={userNameStyle}>{user.name}</div>
                                        <div style={userEmailStyle}>{user.email}</div>
                                    </div>
                                    <div style={coursesContainerStyle}>
                                        {user.courses.length > 0 ? (
                                            user.courses.map((course, courseIndex) => (
                                                course.status !== "waiting" && course.status !== "approved" ? null : (
                                                    <ApproveCourseItems
                                                        key={course.id}
                                                        course={course}
                                                        index={courseIndex}
                                                        user={user}
                                                        response={handleResponse}
                                                    />
                                                )
                                            ))
                                        ) : (
                                            <div style={noCoursesStyle}>No courses available</div>
                                        )}
                                    </div>
                                </div>
                            )
                        );
                    })
                ) : (
                    !error && <div style={{ padding: "10px", color: "#555" }}>No users to display.</div>
                )}
            </div>
        </div>
    );
};

// Styles (same as before)



// Styles

const searchContainerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "300px", // Adjust width as needed
    marginRight: "330px", // Centers the search bar
};

const searchIconStyle = {
    position: "absolute",
    top: "38%",
    left: "11px",
    transform: "translateY(-50%)",
    fontSize: "15px",
    color: "rgb(136, 136, 136)"
};

const searchBarStyle = {
    width: "100%",
    padding: "5px 10px 5px 35px", // Space for the icon
    fontSize: "14px",
    borderRadius: "5px",
    border: "3px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
    fontWeight: "400"
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

const headerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: "2px",
    marginTop: "-10px",
};

const headerStyle = {
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "10px",
};

const addCourseButtonStyle = {
    backgroundColor: "#c80202cc",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px",
};

const tableContainerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "20px",
};

const userCardStyle = {
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
};

const userDetailsStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
};

const userNameStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginRight: "10px",
};

const userEmailStyle = {
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#eaeaea",
    padding: "5px 10px",
    borderRadius: "5px",
};

const coursesContainerStyle = {
    marginTop: "10px",
};

const noCoursesStyle = {
    fontStyle: "italic",
    color: "#888",
};

export default ApproveCourses;
