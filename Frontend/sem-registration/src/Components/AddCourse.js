import React from 'react';
import { Button, Form, Dropdown, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import ChooseHeader from './ChooseHeader';


const AddCourse = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // Remove token from localStorage
        setIsLoggedIn(false); // Update login state
    };

    const [newCourse, setNewCourse] = useState({ name: "", degree: "", branch: "", section: "", professor: "" })
    const navigate = useNavigate();
    const handleAddCourse = async (e) => {
        e.preventDefault();

        if (newCourse.name === '' || newCourse.degree === '' || newCourse.section === '' || newCourse.professor === '' || newCourse.branch === '') {
            alert("Fields can not be empty");
        }
        else {
            try {

                const response = await fetch('http://localhost:8080/course/createCourse', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(newCourse),

                }
                );

                if (!response.ok) {
                    throw new Error('Course Registration failed');
                }

                const result = await response.json();
                console.log(result);
                navigate("/Courses")
                alert(`Course ${result.name} added successfully.`)


            } catch (error) {
                console.error('Error:', error);
            }
        }

    };


    return (
        <div>
            <ChooseHeader onLogout={handleLogout} />
            <Container style={{ marginTop: '50px' }}>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4 shadow-lg" style={{ backgroundColor: '#ab9a9a21', color: '#fff' }}>
                            <h2 className="text-center mb-4" style={{ color: 'black' }}>Add Cousre</h2>
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label style={{ color: 'black' }}>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the course name"
                                        className="mb-3"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                        onChange={(e) => { setNewCourse({ ...newCourse, name: e.target.value }) }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="ProfessorName">
                                    <Form.Label style={{ color: 'black' }}>Professor Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the Professor name"
                                        className="mb-3"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                        onChange={(e) => { setNewCourse({ ...newCourse, professor: e.target.value }) }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="degree">
                                    <Form.Label style={{ color: 'black' }}>Degree</Form.Label>
                                    <Dropdown
                                        className="mb-3"
                                        onSelect={(selectedDegree) => setNewCourse({ ...newCourse, degree: selectedDegree })} // Handle selection
                                    >
                                        <Dropdown.Toggle
                                            variant="outline-warning"
                                            id="dropdown-degree"
                                            style={{ color: '#1E2A47', backgroundColor: 'white', width: "100%" }}
                                        >
                                            {newCourse.degree || "Select Degree"}
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
                                        onSelect={(selectedBranch) => setNewCourse({ ...newCourse, branch: selectedBranch })} // Handle selection
                                    >
                                        <Dropdown.Toggle
                                            variant="outline-warning"
                                            id="dropdown-branch"
                                            style={{ color: '#1E2A47', backgroundColor: 'white', width: "100%" }}
                                        >
                                            {newCourse.branch || "Select Branch"}
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
                                        onSelect={(selectedSection) => setNewCourse({ ...newCourse, section: selectedSection })} // Move onSelect here
                                    >
                                        <Dropdown.Toggle
                                            variant="outline-warning"
                                            id="dropdown-section"
                                            style={{ color: '#1E2A47', backgroundColor: 'white', width: "100%" }}
                                        >
                                            {newCourse.section || "Select Section"}
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

                                <Button
                                    variant="warning"
                                    type="submit"
                                    className="w-100"
                                    style={{ backgroundColor: '#21BA45', borderColor: '#FFC107', color: '#1E2A47' }}
                                    onClick={handleAddCourse}
                                >
                                    Add
                                </Button>

                                <Link to={"/Courses"}>
                                    <Button
                                        variant="warning"
                                        type="submit"
                                        className="w-100"
                                        style={{ backgroundColor: 'rgb(219 40 40 / 86%)', borderColor: '#FFC107', color: 'white', marginTop: "10px" }}
                                    >
                                        Cancel
                                    </Button>
                                </Link>

                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddCourse
