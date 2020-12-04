import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    let registerSubmit = (event) => {
        event.preventDefault();
        console.log("Firstname: " + firstname);
        console.log("Lastname: " + lastname);
        console.log("Email: " + email);
        console.log("Password: " + password);
    }

    return (
        <div className="container mb-5 mt-5">
            <div className="row">
                <div className="col-md-8 col-lg-6 m-auto">
                    <div className="jumbotron">
                        <h2 className="text-center mb-3">Register</h2>
                        <h5 className="font-weight-bold">Hello! Let's get started.</h5>
                        <Form onSubmit={registerSubmit}>
                            <Form.Group controlId="formFirstname">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control type="text" onChange={e => setFirstname(e.target.value)} placeholder="Firstname" />
                            </Form.Group>
                            <Form.Group controlId="formLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type="text" onChange={e => setLastname(e.target.value)} placeholder="Lastname" />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
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