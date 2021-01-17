import React, { useState, useContext } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFileEarmarkCheck } from "react-icons/bs";
import FlowElement from '../FlowElement/FlowElement';
import { APIContext } from "../../Services/APIService";
import { ImArrowRight2 } from "react-icons/im";
import { AiOutlineSend } from 'react-icons/ai';

function Template(props) {
    let [template, setTemplate] = useState(props.template);

    const { createTicket } = useContext(APIContext);

    let createTemplate = (event) => {
        event.preventDefault();
        createTicket(props.token, template.id)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

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
                                let target = { name: user, current: false};
                                return <FlowElement key={id} target={target}/>
                            })
                        }
                        <BsFileEarmarkCheck />
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center">
                <Button className="btn btn-hot-bordered m-2 p-3 rounded" onClick={e => createTemplate(e)}>
                    <AiOutlineSend size={30}/>
                    <span className="d-block">Exchange document</span>
                </Button>
            </div>
        </Jumbotron>
    );
}

export default Template;