import React, { useState } from "react";
import { AiOutlineCloudDownload } from 'react-icons/ai';
import './downloadFile.css'

function DownloadFile(props) {
    const [fileId, setFileId] = useState(props.fileId);
    const [fileName, setFileName] = useState(props.fileName);

    let downloadFile = (fileId) => {
        console.log("Downloading file of id " + fileId);
    }

    return (
        <div className="text-center text-main download mb-4" onClick={() => downloadFile(fileId)}>
            <AiOutlineCloudDownload size={80} />
            <span className="d-block">Download File</span>
            <span className="d-block">{fileName}</span>
        </div>
    );
}

export default DownloadFile;