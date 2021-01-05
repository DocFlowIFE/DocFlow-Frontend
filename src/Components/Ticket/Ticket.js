import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { BsFileEarmarkCheck } from "react-icons/bs";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import UploadFile from "../UploadFile/UploadFile";
import FlowElement from '../FlowElement/FlowElement';
import DownloadFile from "../DownloadFile/DownloadFile";

function Ticket(props) {
    let [document, setDocument] = useState(props.document);

    let sendFile = (event, file) => {
        event.preventDefault();
        console.log(file);
    }

    let getStatusBox = (document) => {
        let variant = null;
        switch(document.status){
            case 'Waiting': variant = 'info'; break;
            case 'Pending': variant = 'warning'; break;
            case 'Rejected': variant = 'danger'; break;
            case 'Accepted': variant = 'success'; break;
            case 'Closed': variant = 'secondary'; break;
            default: variant = 'secondary';
        }
        return (
            <Alert variant={variant} className="m-3">
                {document.status}
            </Alert>
        )
    }

    let getUploadFileComponent = (document) => {
        if(document.status !== 'Pending' && document.status !== 'Closed')
        {
            return <UploadFile id={props.id+"_UploadFile"} onFileSend={sendFile} />
        }
    }

    let getCommentBox = (document) => {
        if(document.status === "Rejected" || document.status === "Accepted")
        {
            return (
            <ListGroup.Item>
                <span className="font-weight-bold">Comment: </span>
                {document.comment}
            </ListGroup.Item>);
        }
    }

    return (
        <Jumbotron className="row mb-5">
            <div className="col-md-8">
                <h1>{document.title}</h1>
                <ListGroup className="font-normal" variant="flush">
                    <ListGroup.Item>
                        <span className="font-weight-bold">Date: </span>
                        {document.date}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Description: </span>
                        {document.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Flow: </span>
                        {
                            document.flow.map((target, id) =>
                                <FlowElement key={id} target={target}/>
                            )
                        }
                        <BsFileEarmarkCheck />
                    </ListGroup.Item>
                    {getCommentBox(document)}
                </ListGroup>
                {getStatusBox(document)}
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center">
                <div>
                    <h4>Files exchanged</h4>
                    {document.files.map((file, index) => (
                        <DownloadFile key={props.id+"_DownloadFile_"+index} fileId={file.fileId} fileName={file.fileName} />
                    ))}
                </div>
                {getUploadFileComponent(document)}
            </div>
        </Jumbotron>
    );
}

export default Ticket;