import React, { useState, useContext } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { BsFileEarmarkCheck } from "react-icons/bs";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsCheckAll, BsX } from 'react-icons/bs';
import DownloadFile from "../DownloadFile/DownloadFile";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { APIContext } from "../../Services/APIService";
import Spinner from "../Spinner/Spinner";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FlowElement from '../FlowElement/FlowElement';

function Request(props) {
    const [request, setRequest] = useState(props.request);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [sendDisable, setSendDisable] = useState(true);
    const [responding, setResponding] = useState(false);
    const [acceptShow, setAcceptShow] = useState(false);
    const [rejectShow, setRejectShow] = useState(false);

    const { patchTicket, uploadFile } = useContext(APIContext);

    let closeModals = () => {
        setAcceptShow(false);
        setRejectShow(false);
        setResponding(false);
        setFile(null);
        setSendDisable(true);
        setMessage("");
        request.comment = "";
    }

    let showAcceptModal = () => setAcceptShow(true);
    let showRejectModal = () => setRejectShow(true);

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
    }

    let acceptWithoutDocument = (event) => {
        event.preventDefault();
        console.log(request);

        setResponding(true);

        request.status = "accepted";
        let oldFilename = request.files[1].filename;

        patchTicket(props.token, request, oldFilename)
            .then(res => {
                console.log(res);
                closeModals();
                window.location = "/requests";
            })
            .catch(err => {
                console.log(err);
                setResponding(false);
                setSendDisable(false);
                setMessage("Sorry, somthing went wrong.");
            });
    }

    let acceptWithDocument = (event) => {
        event.preventDefault();
        console.log(request);

        setResponding(true);

        request.status = "accepted";
        let newFilename = file.name;

        patchTicket(props.token, request, newFilename)
            .then(res => {
                console.log(res);
                uploadFile(res.fileLink.url, file, res.fileLink.fields)
                    .then(data => { closeModals(); window.location = "/requests"; })
                    .catch(err => { closeModals(); window.location = "/requests"; });
            })
            .catch(err => {
                console.log(err);
                setResponding(false);
                setSendDisable(false);
                setMessage("Sorry, somthing went wrong.");
            });
    }

    let reject = (event) => {
        event.preventDefault();
        console.log(request);

        setResponding(true);

        request.status = "rejected";
        let oldFilename = request.files[1].filename;

        patchTicket(props.token, request, oldFilename)
            .then(res => {
                console.log(res);
                setResponding(false);
                setSendDisable(false);
                closeModals();
                window.location = "/requests";
            })
            .catch(err => {
                console.log(err);
                setResponding(false);
                setSendDisable(false);
                closeModals();
                window.location = "/requests";
            });
    }

    return (
        <Jumbotron className="row mb-5">
            <div className="col-md-8">
                <h1>{request.title}</h1>
                <ListGroup className="font-normal" variant="flush">
                    <ListGroup.Item>
                        <span className="font-weight-bold">Description: </span>
                        {request.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Flow: </span>
                        {
                            request.flow.map((user, id) =>
                                request.currentUser === user
                                ? <FlowElement key={id} user={user} current={true}/>
                                : <FlowElement key={id} user={user} current={false}/>
                            )
                        }
                        <BsFileEarmarkCheck />
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center">
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <h4>Files exchanged</h4>
                        {request.files.map((file, index) => (
                            <DownloadFile key={props.id+"_DownloadFile_"+index} fileLink={file.fileLink} filename={file.filename} />
                        ))}
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <Button className="m-2 btn btn-yes" onClick={e => showAcceptModal()}>
                            <BsCheckAll size={30}/>
                        </Button>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <Button className="m-2 btn btn-no" onClick={e => showRejectModal(e)}>
                            <BsX size={30}/>
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={acceptShow} onHide={closeModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Accept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Accept ticket and send forward.</span>
                    <hr/>
                    <Form>
                        <Form.Group>
                            <Form.File className="show" label="Upload the document" onChange={e => addFile(e.target)} id="document" />
                        </Form.Group>
                        <Button className="btn btn-yes btn-block" disabled={sendDisable || responding} onClick={e => acceptWithDocument(e)}>
                            Send and accept
                        </Button>
                    </Form>
                    <hr/>
                    <Button className="btn btn-yes btn-block" disabled={responding} onClick={e => acceptWithoutDocument(e)}>
                        Accept without document
                    </Button>
                    <ErrorMessage message={message} />
                    { responding? <Spinner /> : <span></span> }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModals}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={rejectShow} onHide={closeModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="acceptComment">
                            <Form.Label>Add comment here</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={e => request.comment = e.target.value}/>
                        </Form.Group>
                    </Form>
                    <hr/>
                    <span>Are you sure you want to <u>reject</u> this ticket?</span>
                    <ErrorMessage message={message} />
                    { responding? <Spinner /> : <span></span> }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModals}>
                        Close
                    </Button>
                    <Button className="btn btn-no-white" disabled={responding} onClick={e => reject(e)}>
                        Yes, reject
                    </Button>
                </Modal.Footer>
            </Modal>
        </Jumbotron>
    );
}

export default Request;