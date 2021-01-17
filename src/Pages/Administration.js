import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../Components/Authentication/Account";
import CreateTemplateForm from "../Components/CreateTemplateForm/CreateTemplateForm";

function Administration() {
    const [token, setToken] = useState(null);
    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession(true)
            .then(token => {setToken(token)})
            .catch(() => {
                window.location = "/login";
            });
    }, []); 
    
    return (
        <div className="container mb-5 mt-5">
            <CreateTemplateForm token={token}></CreateTemplateForm>
        </div>
    );
}

export default Administration;