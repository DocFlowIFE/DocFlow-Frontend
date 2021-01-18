import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import { APIContext } from "../Services/APIService";
import Spinner from "../Components/Spinner/Spinner";
import Alert from 'react-bootstrap/Alert';
import Request from "../Components/Request/Request";

function Requests() {
    const [requests, setRequests] = useState({
        loading: true,
        data: null,
        error: false
    });
    const [token, setToken] = useState(null);

    const { getSession } = useContext(AccountContext);
    const { getAdminTemplates, getRequests } = useContext(APIContext);

    let loadRequests = (token) => {
        // oh shit, here we go again
        getRequests(token)
            .then(tickets => { 
                console.log(tickets);
                getAdminTemplates(token)
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
                                currentUser: ticket.CurrentUserEmail? ticket.CurrentUserEmail[0] : "",
                                files: []
                            }
                            doc.files.push(
                                {
                                    fileLink: template.fileLink,
                                    filename: template.filename
                                }
                            );
                            doc.files.push(
                                {
                                    fileLink: ticket.fileLink,
                                    filename: ticket.filename
                                }
                            );
                            resultDocuments.push(doc);
                        });
                        console.log(resultDocuments);
                        setRequests({
                            loading: false,
                            data: resultDocuments,
                            error: false
                        });
                    })
                    .catch(err => { 
                        console.log(err); 
                        setRequests({
                            loading: false,
                            data: null,
                            error: true
                        });
                    });
            })
            .catch(err => {
                console.log(err);
                setRequests({
                    loading: false,
                    data: null,
                    error: true
                })
            });
    }

    useEffect(() => {
        getSession(true)
            .then(token => {
                setToken(token);
                loadRequests(token); 
            })
            .catch(() => {
                window.location = "/login";
            });
    }, []);

    let content = null;

    if (requests.loading) {
        content = <Spinner/>
    }

    if (requests.error) {
        content =
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    There was an error please refresh or try again later.
                </p>
            </Alert>
    }

    if (requests.data) {
        content =
            <div className="container mt-5">
                {requests.data.map((req, index) => (
                    <Request request={req} key={index} id={index} token={token} />
                ))};
            </div>
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default Requests;