import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';
import PasswordValidator from '../Services/PasswordValidator';
import UserPool from '../Components/Authentication/UserPool';
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

function Register() {
    const [email, setEmail] = useState(null);
    const [waitForConfirmation, setWaitForConfirmation] = useState(false);
    const [password, setPassword] = useState(null);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState(null);
    const [message, setMessage] = useState("");
   
    var userData = {
        Username: email,
        Pool: UserPool,
    };
    var attributeList = [];
    attributeList.push(new CognitoUserAttribute({Name:"email",Value:email}));

    let registerSubmit = (event) => {
        event.preventDefault();
        if(isValidPassword)
        {
            UserPool.signUp(email, password, attributeList, [], (err, data) => {
                if(err)
                {
                    console.log(err);
                    setMessage("Sorry, registration error has occurred");
                }
                else
                {
                    console.log(data);
                    setMessage("");
                    setWaitForConfirmation(true);
                }
            });
        }
        else
        {
            setMessage("Provided password is not valid.");
        }
    }

    let confirmCode = (event) => {
        event.preventDefault();
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
            if(err)
            {
                console.log(err);
                setMessage("Invalid code.");
            }
            else
            {
                window.location = "/login";
            }
        });
    }

    let handleSetPassword = (pass) => {
        setPassword(pass);
        if (PasswordValidator.MeetsPasswordPolicy(pass))
        {
            setMessage("");
            setIsValidPassword(true);
        }
        else
        {
            setMessage("Provided password is too weak.");
            setIsValidPassword(false);
        }
    }

    return (
        <div className="container mb-5 mt-5">
            <div className="row">
                <div className="col-md-8 col-lg-6 m-auto">
                    <div className="jumbotron">
                        <h2 className="text-center mb-3">Register</h2>
                        <h5 className="font-weight-bold">Hello! Let's get started.</h5>
                        <Form onSubmit={registerSubmit} hidden={waitForConfirmation}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={e => handleSetPassword(e.target.value)} placeholder="Password" />
                            </Form.Group>
                            <Button className="btn btn-main btn-block p-2 mt-4 rounded-0" type="submit" disabled={waitForConfirmation}>
                                Register
                            </Button>
                        </Form>
                        <Form onSubmit={confirmCode} hidden={!waitForConfirmation}>
                            <Form.Group controlId="formCode">
                                <Form.Label>Verification code</Form.Label>
                                <Form.Control type="text" onChange={e => setConfirmationCode(e.target.value)} placeholder="Enter code" />
                            </Form.Group>
                            <Button className="btn btn-main btn-block p-2 mt-4 rounded-0" type="submit">
                                Confirm
                            </Button>
                        </Form>
                        <ErrorMessage message={message} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;