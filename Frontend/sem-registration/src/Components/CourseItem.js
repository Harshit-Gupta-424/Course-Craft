import React,{useState} from "react";

const CourseItem = ({ course, index, enroll }) => {

  const [courseEnrolled, setCourseEnrolled] = useState()
  const handleEnrollment = (courseName) => {
    enroll(course);
    window.location.reload(); 
  };

  const renderButton = () => {
  
    if (course.status === "waiting") {
      return (
        <button  style={{...buttonStyle, backgroundColor:"#dd1515", cursor:"not-allowed"}} disabled>
          Waiting for approval
        </button>
      );
    } 
    
    else if (course.status === "approved") {
      return (
        <button style={{...buttonStyle, backgroundColor:"rgb(20 143 25)", cursor:"not-allowed", opacity:"0.5"}} disabled>
          Enrolled successfully
        </button>
      );
    } 
    
    else {
      return (
        <button style={{...buttonStyle, backgroundColor:"#4CAF50"}} onClick={handleEnrollment}>
          Enroll
        </button>
      );
    }
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
        <div style={cellStyle}>{renderButton()}</div>
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
  display: "flex",
  width: "100%",
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  margin: "10px auto",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const cellStyle = {
  flex: 1,
  padding: "10px",
  minWidth: "120px",
};

const buttonStyle = {
  // backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default CourseItem;
