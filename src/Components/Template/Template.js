import React, { useState } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFileEarmarkCheck } from "react-icons/bs";
import FlowElement from '../FlowElement/FlowElement';
import { AiOutlineSend } from 'react-icons/ai';

function Ticket(props) {
    let [template, setTemplate] = useState(props.template);

    let createTicket = (event) => {
        event.preventDefault();
        console.log(template.templateId);
    }

    return (
        <Jumbotron className="row mb-5">
            <div className="col-md-8">
                <h1>{template.title}</h1>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <span className="font-weight-bold">Description: </span>
                        {template.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Flow: </span>
                        {
                            template.flow.map((target, id) =>
                                <FlowElement key={id} target={target}/>
                            )
                        }
                        <BsFileEarmarkCheck />
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center">
                <Button className="btn btn-hot-bordered m-2 p-3 rounded" onClick={e => createTicket(e)}>
                    <AiOutlineSend size={30}/>
                    <span className="d-block">Exchange document</span>
                </Button>
            </div>
        </Jumbotron>
    );
}

export default Ticket;