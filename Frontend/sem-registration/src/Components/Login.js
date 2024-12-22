import React from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import Header from './Header';

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if (credentials.password === '' || credentials.email === '') {
            alert("Fields can not be empty");
        }
        else {
            try {
                const response = await fetch('http://localhost:8080/user/loginUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(credentials),

                }
                );

                if (!response.ok) {
                    alert("Email or password of the user is incorrect")
                    throw new Error('Login failed');
                }

                const result = await response.json();
                localStorage.setItem('jwtToken', result.token);
                
                navigate("/")
                window.location.reload();


            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    return (

        <div>
            <Header />
            <Container style={{ marginTop: '50px' }}>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4 shadow-lg " style={{ backgroundColor: '#ab9a9a21', color: '#fff' }}>
                            <h2 className="text-center mb-4" style={{ color: 'black' }}>Login</h2>
                            <Form>
                                <Form.Group controlId="email">
                                    <Form.Label style={{ color: 'black' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        className="mb-3"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                        onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label style={{ color: 'black' }}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        className="mb-3"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                        onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }}
                                    />
                                </Form.Group>

                                <Button
                                    variant="warning"
                                    type="submit"
                                    className="w-100"
                                    style={{ backgroundColor: '#21BA45', borderColor: '#FFC107', color: '#1E2A47' }}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>

                                <Link to={"/Register"}>
                                    <Button
                                        variant="warning"
                                        type="submit"
                                        className="w-100"
                                        style={{ backgroundColor: '#ffd024', borderColor: '#FFC107', color: '#1E2A47', marginTop: "10px" }}
                                    >
                                        Don't have an account
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

export default Login;
