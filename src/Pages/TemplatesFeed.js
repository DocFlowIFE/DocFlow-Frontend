import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import { APIContext } from "../Services/APIService";
import Template from "../Components/Template/Template";
import Spinner from "../Components/Spinner/Spinner";
import Alert from 'react-bootstrap/Alert';

function TemplateFeed() {
    let [templates, setTemplates] = useState({
        loading: true,
        data: null,
        error: false
    });
    let [token, setToken] = useState(null);

    const { getSession } = useContext(AccountContext);
    const { getTemplates } = useContext(APIContext);

    let requestTemlates = (token) => {
        getTemplates(token)
            .then(templates => { 
                setTemplates({
                    loading: false,
                    data: templates,
                    error: true
                });
            })
            .catch(err => {
                console.log(err);
                setTemplates({
                    loading: false,
                    data: null,
                    error: true
                })
            });
    }

    useEffect(() => {
        getSession()
        .then(token => {
            setToken(token);
            requestTemlates(token);
        })
        .catch(() => {
            window.location = "/login";
        });
    }, []);

    let content = null;

    if (templates.loading) {
        content = <Spinner/>
    }

    if (templates.error) {
        content =
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    There was an error please refresh or try again later.
                </p>
            </Alert>
    }

    if (templates.data) {
        content =
            <div className="container mt-5">
                {templates.data.map((template, index) => (
                    <Template template={template} key={index} id={index} token={token}/>
                ))};
            </div>
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default TemplateFeed;