import React, { useState } from "react";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import './downloadFile.css';

function DownloadFile(props) {
    return (
        <a href={props.fileLink} className="d-block">
            <div className="text-main download">
                <span className="d-block p-2"><HiOutlineDocumentDownload size="24"></HiOutlineDocumentDownload> {props.filename}</span>
            </div>
        </a>
    );
}

export default DownloadFile;