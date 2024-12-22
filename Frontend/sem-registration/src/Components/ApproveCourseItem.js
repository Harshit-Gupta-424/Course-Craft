import React from "react";

const ApproveCourseItem = ({ course, index, user, response }) => {
  const handleApprove = (courseName) => {
    response(course, "approved", user);
    window.location.reload(); 
  };

  const handleReject = (courseName) => {
    response(course, "rejected", user);
    window.location.reload(); 
  };

  return (
    <div style={rowStyle}>
      <div style={rowBox}>
        <div style={cellStyle}>{index + 1}</div>
        <div style={cellStyle}>{course.degree}</div>
        <div style={cellStyle}>{course.branch}</div>
        <div style={cellStyle}>{course.name}</div>
        <div style={cellStyle}>{course.section}</div>
        <div style={cellStyle}>{course.professor}</div>

        <div style={cellStyle}>
          {course.status === "waiting" ? (
            <>
              <button
                style={buttonStyle}
                onClick={() => handleApprove(course.name)}
              >
                Approve
              </button>
              <button
                style={{
                  ...buttonStyle,
                  marginLeft: "10px",
                  width: "40%",
                  backgroundColor: "rgba(200, 2, 2, 0.8)",
                }}
                onClick={() => handleReject(course.name)}
              >
                Reject
              </button>
            </>
          ) : course.status === "approved" ? (
            <button
              style={{ ...buttonStyle, cursor: "not-allowed", opacity: 0.6, marginLeft:"20px", width:"60%" }}
              disabled
            >
              Approved
            </button>
          ) : ( null
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const rowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textAlign: "left",
};

const rowBox = {
  display: "flex", // Ensures a horizontal layout
  width: "100%", // Utilizes the full width of the parent container
  backgroundColor: "#f9f9f9", // Light gray background for contrast
  border: "1px solid #ddd", // Subtle border for a clean look
  borderRadius: "8px", // Smoothly rounded corners
  padding: "10px", // Adds spacing inside the box
  margin: "10px auto", // Centers the row and adds spacing between rows
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
};

const cellStyle = {
  flex: 1,
  padding: "10px",
  minWidth: "120px",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ApproveCourseItem;
