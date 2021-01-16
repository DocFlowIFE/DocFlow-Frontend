import { React, createContext } from 'react';
import axios from 'axios';

const APIContext = createContext();

const API = props => {
    const userAPI = 'https://28bc3rji7k.execute-api.us-east-1.amazonaws.com/prod/';
    const adminAPI = 'https://ybhrgyf0lb.execute-api.us-east-1.amazonaws.com/prod/';

    let getConfig = (token) => { return { headers:{Authorization: `Bearer ${token}`} }};

    let getTickets = async (token) => {
        return await new Promise((resolve, reject) => {
            // const body = {
            //     key: "value"
            // };

            axios.get(userAPI + 'tickets', getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    return (
        <APIContext.Provider value={{getTickets}}>
            {props.children}
        </APIContext.Provider>
    );
};

export { API, APIContext };