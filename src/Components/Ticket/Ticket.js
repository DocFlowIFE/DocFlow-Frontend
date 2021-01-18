import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { BsFileEarmarkCheck } from "react-icons/bs";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import FlowElement from '../FlowElement/FlowElement';
import DownloadFile from "../DownloadFile/DownloadFile";

function Ticket(props) {
    let [document, setDocument] = useState(props.document);

    let getStatusBox = (document) => {
        let variant = null;
        switch(document.status){
            case 'waiting': variant = 'info'; break;
            case 'pending': variant = 'warning'; break;
            case 'rejected': variant = 'danger'; break;
            case 'accepted': variant = 'success'; break;
            case 'closed': variant = 'secondary'; break;
            default: variant = 'secondary';
        }
        return (
            <Alert variant={variant} className="m-3">
                {document.status}
            </Alert>
        )
    }

    let getCommentBox = (document) => {
        if(document.status === "rejected")
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
                            document.flow.map((user, id) =>
                                document.CurrentUserEmail == user
                                ? <FlowElement key={id} user={user} current={true}/>
                                : <FlowElement key={id} user={user} current={false}/>
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
                        <DownloadFile key={props.id+"_DownloadFile_"+index} fileLink={file.fileLink} filename={file.filename} />
                    ))}
                </div>
            </div>
        </Jumbotron>
    );
}

export default Ticket;