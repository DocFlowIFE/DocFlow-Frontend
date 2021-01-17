import React from "react";
import Badge from 'react-bootstrap/Badge';
import { ImArrowRight2 } from "react-icons/im";

function FlowElement(props) {
    let content = null;

    if (props.current === true) {
        content = <span>
            <Badge className="p-2" pill variant="info">
                {props.user}
            </Badge>
            <ImArrowRight2 className="m-1"/>
        </span>;
    }
    else {
        content = <span>
            {props.user}
            <ImArrowRight2 className="m-1"/>
        </span>;
    }

    return (
        <span>
            {content}
        </span>
    );
}

export default FlowElement;