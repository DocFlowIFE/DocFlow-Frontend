import React, { useState } from "react";
import Ticket from "../Components/Ticket/Ticket";

function Feed() {
    let [documents, setDocuments] = useState(
        [
            {
                title: "Example document",
                date: "15.10.2020",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non pharetra augue. Aenean nec ipsum vulputate libero condimentum eleifend ac ut lacus. Etiam gravida tincidunt fringilla. Donec viverra scelerisque est non laoreet.",
                status: "Waiting",
                flow: [
                    {
                        name: "You",
                        current: true
                    },
                    {
                        name: "Dean's office",
                        current: false
                    },
                    {
                        name: "You",
                        current: false
                    }
                ],
                baseDocument: {
                    fileName: "exampleFile.docx",
                    fileId: 54394324
                }
            },
            {
                title: "Important document",
                date: "18.10.2020",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                status: "Pending",
                flow: [
                    {
                        name: "You",
                        current: false
                    },
                    {
                        name: "Dean's office",
                        current: true
                    },
                    {
                        name: "You",
                        current: false
                    }
                ],
                baseDocument: {
                    fileName: "importantFile.docx",
                    fileId: 3231141
                }
            }
        ]
    );

    return (
        <div className="container mt-5">
            {documents.map((document, index) => (
                <Ticket document={document} key={index} id={index} />
            ))};
        </div>
    );
}

export default Feed;