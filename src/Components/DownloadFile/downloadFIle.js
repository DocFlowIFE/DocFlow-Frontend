import React, { useState } from "react";
import './downloadFile.css';

function DownloadFile(props) {
    const [fileId, setFileId] = useState(props.fileId);
    const [fileName, setFileName] = useState(props.fileName);

    let downloadFile = (fileId) => {
        console.log("Downloading file of id " + fileId);
    }

    return (
        <div className="text-main download" onClick={() => downloadFile(fileId)}>
            <span className="d-block p-2">{fileName}</span>
        </div>
    );
}

export default DownloadFile;