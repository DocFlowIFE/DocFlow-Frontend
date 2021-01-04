import React, { useState } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { BsFileEarmarkCheck } from "react-icons/bs";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsCheckAll, BsX } from 'react-icons/bs';
import DownloadFile from "../DownloadFile/DownloadFile";
import UploadFile from "../UploadFile/UploadFile";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FlowElement from '../FlowElement/FlowElement';

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

    let acceptWithoutDocument = (event) => {
        event.preventDefault();
        console.log("Accepted: " + request.ticketId);
        console.log(request.comment);
    }

    let uploadAndAccept = (event, file) => {
        console.log("Accepted: " + request.ticketId);
        console.log(file);
    }

    let reject = (event) => {
        event.preventDefault();
        console.log("Rejected: " + request.ticketId);
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
                        <span className="font-weight-bold">Flow: </span>
                        {
                            request.flow.map((target, id) =>
                                <FlowElement key={id} target={target}/>
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
                            <DownloadFile key={props.id+"_DownloadFile_"+index} fileId={file.fileId} fileName={file.fileName} />
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
                    <UploadFile id={props.id+"_UploadFile"} onFileSend={uploadAndAccept} btnText="Send and accept" />
                    <hr/>
                    <Button className="btn btn-yes btn-block" onClick={e => acceptWithoutDocument(e)}>
                        <b>Accept without document</b>
                    </Button>
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