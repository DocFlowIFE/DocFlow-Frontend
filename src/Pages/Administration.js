import React, { useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import CreateTemplateForm from "../Components/CreateTemplateForm/CreateTemplateForm";

function Administration() {
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
        <div className="container mb-5 mt-5">
            <CreateTemplateForm></CreateTemplateForm>
        </div>
    );
}

export default Administration;