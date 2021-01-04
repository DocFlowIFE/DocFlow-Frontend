import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import Request from "../Components/Request/Request";

function Requests() {
    let [requests, setRequests] = useState(
        [
            {
                ticketId: 78789821,
                title: "Example document",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non pharetra augue. Aenean nec ipsum vulputate libero condimentum eleifend ac ut lacus. Etiam gravida tincidunt fringilla. Donec viverra scelerisque est non laoreet.",
                flow: [
                    {
                        name: "You",
                        current: false
                    },
                    {
                        name: "Dean's office",
                        current: true
                    }
                ],
                files: [
                    {
                        fileName: "edytaFile.docx",
                        fileId: 54394324
                    }
                ]
            },
            {
                ticketId: 90009431,
                title: "Important document",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                flow: [
                    {
                        name: "You",
                        current: false
                    },
                    {
                        name: "Dean's office",
                        current: true
                    }
                ],
                files: [
                    {
                        fileName: "marekFileASAP.docx",
                        fileId: 3231141
                    }
                ]
            }
        ]
    );

    const { getSession } = useContext(AccountContext);
    useEffect(() => {
        getSession(true)
        .then(token => {
            console.log(token);
        })
        .catch(() => {
            window.location = "/login";
        });
    }, []);

    return (
        <div className="container mt-5">
            {requests.map((req, index) => (
                <Request request={req} key={index} id={index} />
            ))};
        </div>
    );
}

export default Requests;