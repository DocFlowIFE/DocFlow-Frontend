import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";

function Login() {
    return (
        <div class="container mb-5 mt-5">
            <div className="row">
                <div className="col-md-8 col-lg-6 m-auto">
                    <div className="jumbotron">
                        <h2 className="text-center mb-3">Login</h2>
                        <h5 className="font-weight-bold">Hello! Nice to see you.</h5>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button className="btng btn-block btng--gradient btng--xlrg rounded-0" variant="primary" type="submit">
                                <span className="btng_text">Login</span>
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;