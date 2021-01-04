import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AccountContext } from "../Components/Authentication/Account";
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';

function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState("");

    const { authenticate } = useContext(AccountContext);

    let loginSubmit = (event) => {
        event.preventDefault();
        authenticate(email, password)
            .then(res => {
                window.location = "/tickets";
            })
            .catch(err => {
                setMessage(err);
            });
    }

    return (
        <div className="container mb-5 mt-5">
            <div className="row">
                <div className="col-md-8 col-lg-6 m-auto">
                    <div className="jumbotron">
                        <h2 className="text-center mb-3">Login</h2>
                        <h5 className="font-weight-bold">Hello! Nice to see you.</h5>
                        <Form onSubmit={loginSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                            </Form.Group>
                            <Button className="btn btn-hot btn-block p-2 mt-4 rounded-0" type="submit">
                                Login
                            </Button>
                        </Form>
                        <ErrorMessage message={message} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;