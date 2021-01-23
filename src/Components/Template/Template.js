import React, { useState, useContext } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFileEarmarkCheck } from "react-icons/bs";
import FlowElement from '../FlowElement/FlowElement';
import { APIContext } from "../../Services/APIService";
import { ImArrowRight2 } from "react-icons/im";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineSend } from 'react-icons/ai';
import Spinner from "../Spinner/Spinner";

function Template(props) {
    const [template, setTemplate] = useState(props.template);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [exchanged, setExchanged] = useState(false);
    const [sendDisable, setSendDisable] = useState(true);

    const { createTicket, uploadFile } = useContext(APIContext);

    let closeModal = () => {
        setShowModal(false);
        setSendDisable(true);
        setExchanged(false);
        setFile(null);
        setMessage("");
    }

    let exchangeDocument = (event) => {
        event.preventDefault();
        setExchanged(true);

        createTicket(props.token, template.id, file.name)
            .then(result => {
                console.log(result);
                uploadFile(result.fileLink.url, file, result.fileLink.fields)
                    .then(data => window.location = "/tickets")
                    .catch(err => window.location = "/tickets");
            })
            .catch(err => {
                console.log(err);
                setExchanged(false);
                setSendDisable(false);
                setMessage("Sorry, somthing went wrong.");
            });
    }

    let addFile = (input) => {
        setSendDisable(true);
        if(!input.files[0])
        {
            setMessage("Please upload file.");
        } 
        else if (input.files[0].type !== "application/pdf")
        {
            setMessage("Only pdf type is supported. Please, upload document in correct format.");
        }else
        {
            setFile(input.files[0]);
            setSendDisable(false);
            setMessage("");
        }
    };

    return (
        <Jumbotron className="row mb-5">
            <div className="col-md-8">
                <h1>{template.title}</h1>
                <ListGroup className="font-normal" variant="flush">
                    <ListGroup.Item>
                        <span className="font-weight-bold">Description: </span>
                        {template.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Flow: </span>
                        <ImArrowRight2 className="m-1"/>
                        {
                            template.users.map((user, id) => {
                                return <FlowElement key={id} user={user} current={false}/>
                            })
                        }
                        <BsFileEarmarkCheck />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Document to fill: </span>
                        <a href={template.fileLink}>{template.filename}</a>
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center">
                <Button className="btn btn-hot-bordered m-2 p-3 rounded" onClick={e => setShowModal(true)}>
                    <AiOutlineSend size={30}/>
                    <span className="d-block">Exchange document</span>
                </Button>
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Exchange document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.File className="show" label="Upload the completed document" onChange={e => addFile(e.target)} id="document" />
                        </Form.Group>
                        <Button className="btn btn-yes btn-block" disabled={sendDisable} onClick={e => exchangeDocument(e)}>
                            Send
                        </Button>
                        <ErrorMessage message={message} />
                        { exchanged? <Spinner /> : <span></span> }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal} disabled={exchanged}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Jumbotron>
    );
}

export default Template;