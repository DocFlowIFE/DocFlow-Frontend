import React from "react";
import { Jumbotron } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import UploadFile from "../Components/UploadFile/UploadFile";
import DownloadFile from "../Components/DownloadFile/downloadFile";

function Feed() {
    let sendFile = (event, file) => {
        event.preventDefault();
        console.log(file);
    }

    return (
        <div className="container mb-5">
            <Jumbotron className="row">
                <div className="col-md-8">
                    <h1>Document title</h1>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <span className="font-weight-bold">Date: </span>
                            15.11.2020
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="font-weight-bold">Description: </span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non pharetra augue. Aenean nec ipsum vulputate libero condimentum eleifend ac ut lacus. Etiam gravida tincidunt fringilla. Donec viverra scelerisque est non laoreet.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="font-weight-bold">Flow: </span>
                            <b><u className="text-hot">You</u></b> - Dean's office - You
                        </ListGroup.Item>
                    </ListGroup>
                    <Alert variant='secondary' className="mt-4">
                        Waiting
                    </Alert>
                </div>
                <div className="col-md-4 d-flex flex-column justify-content-center">
                    <DownloadFile fileId="53618383913" fileName="exampleFile.docx" />
                    <hr />
                    <UploadFile onFileSend={sendFile} />
                </div>                
            </Jumbotron>
        </div>
    );
}

export default Feed;