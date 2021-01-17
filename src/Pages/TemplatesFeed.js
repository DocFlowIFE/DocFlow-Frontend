import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import { APIContext } from "../Services/APIService";
import Template from "../Components/Template/Template";

function TemplateFeed() {
    let [templates, setTemplates] = useState([]);
    let [token, setToken] = useState(null);

    const { getSession } = useContext(AccountContext);
    const { getTemplates } = useContext(APIContext);

    let requestTemlates = (token) => {
        getTemplates(token)
            .then(data => { setTemplates(data); })
            .catch(err => console.log(err));
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

    return (
        <div className="container mt-5">
            {templates.map((template, index) => (
                <Template template={template} key={index} id={index} token={token}/>
            ))};
        </div>
    );
}

export default TemplateFeed;