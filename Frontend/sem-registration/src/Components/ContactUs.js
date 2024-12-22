import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChooseHeader from "./ChooseHeader";

const ContactUs = () => {

  const [formData, setFormData] = useState({name: "", email: "", message: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
        <ChooseHeader onLogout={handleLogout}/>
    <div className="container" style={{ marginTop: "50px", width: "80%" }}>
      <h2 className="text-center" style={{ color: "#2C3E50" }}>
        Contact Us
      </h2>
      <div
        className="card"
        style={{
          padding: "20px",
          backgroundColor: "#F9F9F9",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={(e)=> {setFormData({...formData, name: e.target.value})}}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={(e)=> {setFormData({...formData, email: e.target.value})}}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              onChange={(e)=> {setFormData({...formData, message: e.target.value})}}
              placeholder="Your message"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: "#21BA45", // Green color for the button
              border: "none",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
