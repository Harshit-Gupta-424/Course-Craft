import React from 'react';
import { Button, Form, Dropdown, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import Header from './Header';

const Register = () => {

    const [newCredentials, setNewCredentials] = useState({ name: "", degree: "", branch: "", section: "", email: "", password: "" })
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (newCredentials.name === '' || newCredentials.degree === '' || newCredentials.section === '' || newCredentials.password === '' || newCredentials.email === '' || newCredentials.branch === '') 
        {
            alert("Fields can not be empty");
        }
        else{
            try {

                const response = await fetch('http://localhost:8080/user/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(newCredentials),

                }
                );

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                const result = await response.json();
                localStorage.setItem('jwtToken', result.token);
                
                navigate("/")
                window.location.reload();


            } catch (error) {
                console.error('Error:', error);
            }
        }

    };


    return (
        <div>
            <Header />
            <Container style={{ marginTop: '50px' }}>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4 shadow-lg" style={{ backgroundColor: '#ab9a9a21', color: '#fff' }}>
                            <h2 className="text-center mb-4" style={{ color: 'black' }}>Register</h2>
                            <Form>
                                <Form.Group controlId="fullName">
                                    <Form.Label style={{ color: 'black' }}>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="mb-3"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                        onChange={(e) => { setNewCredentials({ ...newCredentials, name: e.target.value }) }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="degree">
                                    <Form.Label style={{ color: 'black' }}>Degree</Form.Label>
                                    <Dropdown
                                        className="mb-3"
                                        onSelect={(selectedDegree) => setNewCredentials({ ...newCredentials, degree: selectedDegree })} // Handle selection
                                    >
                                        <Dropdown.Toggle
                                            variant="outline-warning"
                                            id="dropdown-degree"
                                            style={{ color: '#1E2A47', backgroundColor: 'white', width: "100%" }}
                                        >
                                            {newCredentials.degree || "Select Degree"} {/* Display selected degree or placeholder */}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ backgroundColor: '#2C3E50', color: 'black', width: "100%" }}>
                                            <Dropdown.Item eventKey="BTech" style={{ color: '#FFC107' }}>
                                                BTech
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="MTech" style={{ color: '#FFC107' }}>
                                                MTech
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="MCA" style={{ color: '#FFC107' }}>
                                                MCA
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>

                                <Form.Group controlId="branch">
                                    <Form.Label style={{ color: 'black' }}>Branch</Form.Label>
                                    <Dropdown
                                        className="mb-3"
                                        onSelect={(selectedBranch) => setNewCredentials({ ...newCredentials, branch: selectedBranch })} // Handle selection
                                    >
                                        <Dropdown.Toggle
                                            variant="outline-warning"
                                            id="dropdown-branch"
                                            style={{ color: '#1E2A47', backgroundColor: 'white', width: "100%" }}
                                        >
                                            {newCredentials.branch || "Select Branch"} {/* Display selected branch or placeholder */}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ backgroundColor: '#2C3E50', color: 'black', width: "100%" }}>
                                            <Dropdown.Item eventKey="CSE" style={{ color: '#FFC107' }}>
                                                CSE
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="ECE" style={{ color: '#FFC107' }}>
                                                ECE
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="EEE" style={{ color: '#FFC107' }}>
                                                EEE
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>


                                <Form.Group controlId="section">
                                    <Form.Label style={{ color: 'black' }}>Section</Form.Label>
                                    <Dropdown
                                        className="mb-3"
                                        onSelect={(selectedSection) => setNewCredentials({ ...newCredentials, section: selectedSection })} // Move onSelect here
                                    >
                                        <Dropdown.Toggle
                                            variant="outline-warning"
                                            id="dropdown-section"
                                            style={{ color: '#1E2A47', backgroundColor: 'white', width: "100%" }}
                                        >
                                            {newCredentials.section || "Select Section"} {/* Show selected section or placeholder */}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ backgroundColor: '#2C3E50', color: 'black', width: "100%" }}>
                                            <Dropdown.Item eventKey="A" style={{ color: '#FFC107' }}>
                                                A
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="B" style={{ color: '#FFC107' }}>
                                                B
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label style={{ color: 'black' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        className="mb-3"
                                        style={{ backgroundColor: '#fdfdfd', color: 'black' }}
                                        onChange={(e) => { setNewCredentials({ ...newCredentials, email: e.target.value }) }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label style={{ color: 'black' }}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password"
                                        className="mb-3"
                                        style={{ backgroundColor: '#fdfdfd', color: 'black' }}
                                        onChange={(e) => { setNewCredentials({ ...newCredentials, password: e.target.value }) }}
                                    />
                                </Form.Group>

                                <Button
                                    variant="warning"
                                    type="submit"
                                    className="w-100"
                                    style={{ backgroundColor: '#21BA45', borderColor: '#FFC107', color: '#1E2A47' }}
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>

                                <Link to={"/Login"}>
                                    <Button
                                        variant="warning"
                                        type="submit"
                                        className="w-100"
                                        style={{ backgroundColor: '#ffd024', borderColor: '#FFC107', color: '#1E2A47', marginTop: "10px" }}
                                    >
                                        Already have an account
                                    </Button>
                                </Link>

                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
