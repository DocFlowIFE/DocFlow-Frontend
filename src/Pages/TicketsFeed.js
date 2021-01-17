import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import { APIContext } from "../Services/APIService";
import Ticket from "../Components/Ticket/Ticket";

function TicketsFeed() {
    let [documents, setDocuments] = useState(
        [
            {
                ticketId: 68789821,
                title: "Example document",
                date: "15.10.2020",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non pharetra augue. Aenean nec ipsum vulputate libero condimentum eleifend ac ut lacus. Etiam gravida tincidunt fringilla. Donec viverra scelerisque est non laoreet.",
                comment: "",
                status: "Waiting",
                flow: [
                    {
                        name: "You",
                        current: true
                    },
                    {
                        name: "Dean's office",
                        current: false
                    }
                ],
                files: [
                    {
                        fileName: "exampleFile.docx",
                        fileId: 54394324
                    }
                ]
            }
        ]
    );

    const { getSession } = useContext(AccountContext);
    const { getTickets } = useContext(APIContext);

    let requestTickets = (token) => {
        getTickets(token)
            .then(data => { console.log(data); setDocuments(data); })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getSession()
        .then(token => {
            requestTickets(token);
        })
        .catch(() => {
            window.location = "/login";
        });
    }, []);

    return (
        <div className="container mt-5">
            {documents.map((document, index) => (
                <Ticket document={document} key={index} id={index} />
            ))};
        </div>
    );
}

export default TicketsFeed;