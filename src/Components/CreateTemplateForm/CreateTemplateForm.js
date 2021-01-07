import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './createTemplateForm.css';

function CreateTemplateForm() {
    const [title, setTitle] = useState(null);
    const [showList, setShowList] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [usersFilter, setUsersFilter] = useState("");
    const [users, setUsers] = useState(
        [
            { email: "deanOffice@sampledomain.com" },
            { email: "ife@sampledomain.com" },
            { email: "ftims@sampledomain.com" },
            { email: "weeia@sampledomain.com" },
            { email: "binoz@sampledomain.com" },
            { email: "budo@sampledomain.com" },
        ]
    );

    let createTemplate = () => {
        console.log("Create Template");
    };

    let addFileToTemplate = () => {
        console.log("File added");
    };

    let addToFlow = (email) => {
        console.log(email);
    };


    return (
        <div className="jumbotron">
            <Form onSubmit={createTemplate}>
                <h2 className="pb-2">Crate new template</h2>
                <Form.Group controlId="formTicketTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
                </Form.Group>
                <Form.Group controlId="formTicketDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" onChange={e => setTitle(e.target.value)} rows={4} placeholder="Enter description"/>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formTicketDescription">
                    <Form.Label>Flow</Form.Label>
                    <Form.Control type="email" onChange={e => setUsersFilter(e.target.value)} onFocus={() => setShowList(true)} onBlur={() => setShowList(false)} placeholder="Find user by email" />
                    <ListGroup className="list_overlay" hidden={!showList}>
                        {users
                            .filter((user) => {return user.email.startsWith(usersFilter);})
                            .slice(0, 3)
                            .map((user, index) => {
                                return <ListGroup.Item key={"email_"+index} onMouseDown={(e) => addToFlow(e.target.innerText)}>{user.email}</ListGroup.Item>
                            })}
                    </ListGroup>
                </Form.Group>
                <Form.Group>
                    <Form.File className="show" label="Add base document" onChange={addFileToTemplate} id="formTicketBaseDocument" />
                </Form.Group>
                <Button className="col-md-6 m-auto btn btn-hot btn-block p-3 rounded-0" type="submit">
                    Create
                </Button>
            </Form>
            <ErrorMessage message={message} />
        </div>
    );
}

export default CreateTemplateForm;