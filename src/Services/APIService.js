import { React, createContext } from 'react';
import axios from 'axios';

const APIContext = createContext();

const API = props => {
    const userAPI = 'https://oc23wm8556.execute-api.us-east-1.amazonaws.com/prod/';
    const adminAPI = 'https://dq1mh76b8h.execute-api.us-east-1.amazonaws.com/prod/';

    let getConfig = (token) => { return { headers: {Authorization: `Bearer ${token}`} }};
    let getFileConfig = (token) => { return { headers: {Authorization: `Bearer ${token}`} }};

    let getTickets = async (token) => {
        return await new Promise((resolve, reject) => {
            axios.get(userAPI + 'tickets', getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    let getTemplates = async (token) => {
        return await new Promise((resolve, reject) => {
            axios.get(userAPI + 'ticketTemplates', getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    let getUsers = async (token) => {
        return await new Promise((resolve, reject) => {
            axios.get(adminAPI + 'users', getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    let createTemplate = async (token, template) => {
        return await new Promise((resolve, reject) => {
            const body = template;
            axios.post(adminAPI + 'ticketTemplates', body, getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    let createTicket = async (token, templateId) => {
        return await new Promise((resolve, reject) => {
            const body = { ticketTemplateId: templateId, comment: "" };
            axios.post(userAPI + 'tickets', body, getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    let uploadFile = async (url, file, fields) => {
        return await new Promise((resolve, reject) => {
            const formData = new FormData();         
            Object.keys(fields).forEach(key => {
                formData.append(key, fields[key]);
            });           
            formData.append("file", file);
            
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => { resolve(response); })
            .catch((error) => { reject(error); });
        });
    }

    return (
        <APIContext.Provider value={{getTickets, getTemplates, createTemplate, getUsers, uploadFile, createTicket}}>
            {props.children}
        </APIContext.Provider>
    );
};

export { API, APIContext };