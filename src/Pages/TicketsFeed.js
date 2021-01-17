import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import { APIContext } from "../Services/APIService";
import Ticket from "../Components/Ticket/Ticket";
import Spinner from "../Components/Spinner/Spinner";
import Alert from 'react-bootstrap/Alert';

function TicketsFeed() {
    let [documents, setDocuments] = useState({
        loading: true,
        data: null,
        error: false
    });

    const { getSession } = useContext(AccountContext);
    const { getTickets, getTemplates } = useContext(APIContext);

    let requestTickets = (token) => {
        // if you need to read this, I'm sorry
        getTickets(token)
            .then(tickets => { 
                console.log(tickets);
                getTemplates(token)
                    .then(templates => {
                        console.log(templates);
                        var resultDocuments = [];
                        tickets.map((ticket) => {
                            let template = templates.filter(template => template.id === ticket.ticketTemplateId)[0];
                            let doc = {
                                ticketId: ticket.ticketId,
                                date: ticket.dateIssued,
                                comment: ticket.comment,
                                title: template.title,
                                description: template.description,
                                flow: template.users,
                                status: ticket.status,
                                currentFlowId: ticket.currentUserId,
                                files: []
                            }
                            resultDocuments.push(doc);
                        });
                        console.log(resultDocuments);
                        setDocuments({
                            loading: false,
                            data: resultDocuments,
                            error: false
                        });
                    })
                    .catch(err => { 
                        console.log(err); 
                        setDocuments({
                            loading: false,
                            data: null,
                            error: true
                        });
                    });
            })
            .catch(err => {
                console.log(err);
                setDocuments({
                    loading: false,
                    data: null,
                    error: true
                })
            });
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

    let content = null;

    if (documents.loading) {
        content = <Spinner/>
    }

    if (documents.error) {
        content =
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    There was an error please refresh or try again later.
                </p>
            </Alert>
    }

    if (documents.data) {
        content =
            <div className="container mt-5">
                {documents.data.map((document, index) => (
                    <Ticket document={document} key={index} id={index} />
                ))};
            </div>
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default TicketsFeed;