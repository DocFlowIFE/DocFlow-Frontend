import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="container mb-5 mt-5">
            <div className="row">
                <div className="col-md-8 col-lg-6 m-auto">
                    <div className="jumbotron">
                        <h2 className="text-center mb-3">Register</h2>
                        <h5 className="font-weight-bold">Hello! Let's get started.</h5>
                        <Form>
                            <Form.Group controlId="formFirstname">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control type="text" placeholder="Firstname" />
                            </Form.Group>
                            <Form.Group controlId="formLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type="text" placeholder="Lastname" />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button className="btng btn-block btng--gradient btng--xlrg rounded-0" variant="primary" type="submit">
                                <span className="btng_text">Register</span>
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;