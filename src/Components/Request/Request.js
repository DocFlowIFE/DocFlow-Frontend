import React, { useState } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsCheckAll, BsX } from 'react-icons/bs';
import DownloadFile from "../DownloadFile/DownloadFile";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Request(props) {
    let [request, setRequest] = useState(props.request);
    const [acceptShow, setAcceptShow] = useState(false);
    const [rejectShow, setRejectShow] = useState(false);

    let closeModals = () => {
        setAcceptShow(false);
        setRejectShow(false);
        request.comment = "";
    }

    let showAcceptModal = () => setAcceptShow(true);
    let showRejectModal = () => setRejectShow(true);

    let accept = (event) => {
        event.preventDefault();
        console.log("Accepted: " + request.requestId);
        console.log(request.comment);
    }

    let reject = (event) => {
        event.preventDefault();
        console.log("Rejected: " + request.requestId);
        console.log(request.comment);
    }

    return (
        <Jumbotron className="row mb-5">
            <div className="col-md-8">
                <h1>{request.title}</h1>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <span className="font-weight-bold">Description: </span>
                        {request.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Sender: </span>
                        {request.sender}
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center">
                <DownloadFile key={props.id+"_DownloadFile"} fileId={request.document.fileId} fileName={request.document.fileName} />
                <div className="row"> 
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
                    <Form>
                        <Form.Group controlId="acceptComment">
                            <Form.Label>Add comment here</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={e => request.comment = e.target.value}/>
                        </Form.Group>
                    </Form>
                    <hr/>
                    <span>Are you sure you want to <u>accept</u> this document?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModals}>
                        Close
                    </Button>
                    <Button className="btn btn-yes" onClick={e => accept(e)}>
                        Yes, accept
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
                    <span>Are you sure you want to <u>reject</u> this document?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModals}>
                        Close
                    </Button>
                    <Button className="btn btn-no-white" onClick={e => reject(e)}>
                        Yes, reject
                    </Button>
                </Modal.Footer>
            </Modal>
        </Jumbotron>
    );
}

export default Request;