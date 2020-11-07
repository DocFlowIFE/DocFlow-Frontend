import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import UploadFile from "../UploadFile/UploadFile";
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
            case 'Waiting': variant = 'secondary'; break;
            case 'Pending': variant = 'warning'; break;
            case 'Rejected': variant = 'danger'; break;
            case 'Accepted': variant = 'success'; break;
            default: variant = 'secondary';
        }
        return (
            <Alert variant={variant} className="mt-4">
                {document.status}
            </Alert>
        )
    }

    let getFlowBox = (document) => {
        let result = '';
        document.flow.forEach((target) => {
            if (target.current === true) {
                result += '<b><u class="text-hot">'+target.name+'</u></b> - ';
            }
            else {
                result += target.name + ' - ';
            }
        });
        result = result.substring(0, result.length - 2);
        return (<div dangerouslySetInnerHTML={{__html: result}}></div>);
    }

    return (
        <Jumbotron className="row mb-5">
            <div className="col-md-8">
                <h1>{document.title}</h1>
                <ListGroup variant="flush">
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
                        {getFlowBox(document)}
                    </ListGroup.Item>
                </ListGroup>
                {getStatusBox(document)}
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center">
                <DownloadFile key={props.id+"_DownloadFile"} fileId={document.baseDocument.fileId} fileName={document.baseDocument.fileName} />
                <UploadFile id={props.id+"_UploadFile"} onFileSend={sendFile} />
            </div>                
        </Jumbotron>
    );
}

export default Ticket;