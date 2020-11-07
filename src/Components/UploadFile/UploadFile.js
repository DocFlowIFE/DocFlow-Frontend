import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import './uploadFile.css'

function UploadFile(props) {
    const [file, setFile] = useState(null);

    let fileBox = null;

    let clearFileInput = () => {
        document.getElementById("file-upload").value = null;
        setFile(null);
    }

    if(file == null)
    {
        fileBox = 
            <div>
                <div className="p-1">
                    <span className="font-small">No file uploaded</span>
                </div>
            </div>
    }
    else
    {
        fileBox = 
            <div className="p-1">
                <span className="font-small">{file}</span>
                <TiDeleteOutline className="btn-no ml-2" onClick={() => clearFileInput()} size={20} />
            </div>
    }

    return (
        <div>
            <Form className="text-center" onSubmit={ e => props.onFileSend(e, file) }>
                <Form.Label htmlFor="file-upload" className="d-block custom-file-upload">
                    <AiOutlineCloudUpload className="mr-1" size={50} />
                    <span className="d-block">Upload File</span>
                </Form.Label>
                <Form.Group className="m-0">
                    <Form.File id="file-upload" onChange={(e) => setFile(e.target.value)} />
                </Form.Group>
                {fileBox}
                <Button className="btn btn-main btn-block mt-4" type="submit">
                    Send
                </Button>
            </Form>
        </div>
    );
}

export default UploadFile;