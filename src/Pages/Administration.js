import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Components/Authentication/Account";

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
        </div>
    );
}

export default Administration;