import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
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
                baseDocument: {
                    fileName: "exampleFile.docx",
                    fileId: 54394324
                }
            },
            {
                ticketId: 90009431,
                title: "Important document",
                date: "18.10.2020",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                comment: "",
                status: "Pending",
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
                baseDocument: {
                    fileName: "importantFile.docx",
                    fileId: 3231141
                }
            },
            {
                ticketId: 13749221,
                title: "Just document",
                date: "19.10.2020",
                description: "Lorem ipsum dolor sit amet.",
                comment: "Something is wrong with document ... ",
                status: "Rejected",
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
                baseDocument: {
                    fileName: "justFile.docx",
                    fileId: 3213119
                }
            }
        ]
    );

    const { getSession } = useContext(AccountContext);
    useEffect(() => {
        getSession()
        .then(token => {
            console.log(token);
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