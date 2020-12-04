import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";

function Ticket(props) {
    let [template, setTemplate] = useState(props.template);

    return (
        <Jumbotron className="row mb-5">
        </Jumbotron>
    );
}

export default Ticket;