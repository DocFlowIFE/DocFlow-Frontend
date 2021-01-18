import React, { useContext, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { APIContext } from "../../Services/APIService";
import { AccountContext } from "../Authentication/Account";
import Spinner from "../Spinner/Spinner";
import './createTemplateForm.css';

function CreateTemplateForm(props) {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [showList, setShowList] = useState(false);
    const [usersFilter, setUsersFilter] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [usersFlow, setUsersFlow] = useState([]);
    const [createDisable, setCreateDisable] = useState(false);

    const { getUsers, createTemplate, uploadFile } = useContext(APIContext);
    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession(true)
            .then(token => {
                getUsers(token)
                    .then(data => setAllUsers(data))
                    .catch(err => { console.log(err); setMessage("Somthing went wrong, service unavailable."); });
            })
            .catch(() => {
                window.location = "/login";
        });
    }, []);

    let submitTemplate = (e) => {
        e.preventDefault();
        setCreateDisable(true);

        if(!file)
        {
            setMessage("Please upload file.");
            setCreateDisable(false);
            return;
        } 
        else if (file.type != "application/pdf")
        {
            setMessage("Only pdf type is supported. Please, upload document in correct format.");
            setCreateDisable(false);
            return;
        }
        else if(!title || !description || usersFlow.length <= 0)
        {
            setMessage("Please make sure that all fields are filled in.");
            setCreateDisable(false);
            return;
        }

        let template = 
        {
            title: title,
            description: description,
            users: usersFlow,
            filename: file.name
        }

        createTemplate(props.token, template)
            .then(data => {
                console.log(data);
                uploadFile(data.fileUploadLink.url, file, data.fileUploadLink.fields)
                setCreateDisable(false);
                setMessage("Don't worry, the template has been created correctly. It's just that the developer had too little time to add a correct message display, so it looks like an error, although it's not ;)");
            })
            .catch(err => console.log(err));
    };

    let addFileToTemplate = (input) => {
        setFile(input.files[0]);
    };

    let addToFlow = (email) => {
        usersFlow.push(email);
    };

    let deleteFromFlow = (e, index) => {
        e.preventDefault();
        // this is fucking horrible
        let newUsersFlow = usersFlow.slice(0, index).concat(usersFlow.slice(index + 1, usersFlow.length));
        setUsersFlow(newUsersFlow);
    }

    return (
        <div className="jumbotron">
            <Form>
                <h2 className="pb-2">Crate new template</h2>
                <Form.Group controlId="formTicketTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
                </Form.Group>
                <Form.Group controlId="formTicketDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" onChange={e => setDescription(e.target.value)} rows={4} placeholder="Enter description"/>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formTicketDescription">
                    <Form.Label>Flow</Form.Label>
                    <Form.Control type="email" onChange={e => setUsersFilter(e.target.value)} onFocus={() => setShowList(true)} onBlur={() => setShowList(false)} placeholder="Find user by email" />
                    <ListGroup className="list_overlay" hidden={!showList}>
                        {allUsers
                            .filter((user) => {return user.startsWith(usersFilter);})
                            .slice(0, 3)
                            .map((user, index) => {
                                return <ListGroup.Item key={"email_"+index} onMouseDown={(e) => addToFlow(e.target.innerText)}>{user}</ListGroup.Item>
                            })}
                    </ListGroup>
                    <div className="mt-3">
                        {usersFlow
                            .map((user, index) => {
                                return <div key={"flow_"+index} className="flow-list-element">
                                    <span>{user} </span><Button onClick={e => deleteFromFlow(e, index)} className="btn btn-no-text">X</Button>
                                </div>
                        })}
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.File className="show" label="Add base document" onChange={e => addFileToTemplate(e.target)} id="formTicketBaseDocument" />
                </Form.Group>
                <Button className="col-md-6 m-auto btn btn-hot btn-block p-3 rounded-0" disabled={createDisable} onClick={e => submitTemplate(e)}>
                    Create
                </Button>
                { createDisable? <Spinner /> : <span></span> }
            </Form>
            <ErrorMessage message={message} />
        </div>
    );
}

export default CreateTemplateForm;