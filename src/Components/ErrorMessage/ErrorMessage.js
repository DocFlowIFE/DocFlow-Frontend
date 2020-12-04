import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';

function ErrorMessage(props) {
    let message = props.message;
    let errorBox = null;

    if(message !== "" && message !== null)
    {
        errorBox = 
            <Alert variant="danger" className="m-0 mt-4">
                {message}
            </Alert>;
    }

    return (
        <div>
            {errorBox}
        </div>
    );
}

export default ErrorMessage;