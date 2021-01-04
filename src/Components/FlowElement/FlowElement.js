import React, { useState } from "react";
import Badge from 'react-bootstrap/Badge';
import { ImArrowRight2 } from "react-icons/im";

function FlowElement(props) {
    let [target, setTarget] = useState(props.target);
    let content = null;

    if (target.current === true) {
        content = <span>
            <Badge pill variant="info">
                {target.name}
            </Badge>
            <ImArrowRight2 className="m-1"/>
        </span>;
    }
    else {
        content = <span>
            {target.name}
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