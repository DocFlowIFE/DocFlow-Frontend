import { React, createContext } from 'react';
import axios from 'axios';

const APIContext = createContext();

const API = props => {
    const userAPI = 'https://a5fnoisn7g.execute-api.us-east-1.amazonaws.com/prod/';
    const adminAPI = 'https://cxu9hjp5p9.execute-api.us-east-1.amazonaws.com/prod/';

    let getConfig = (token) => { return { headers: {Authorization: `Bearer ${token}`} }};

    let getTickets = async (token) => {
        return await new Promise((resolve, reject) => {
            axios.get(userAPI + 'tickets', getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    let getRequests = async (token) => {
        return await new Promise((resolve, reject) => {
            axios.get(adminAPI + 'tickets', getConfig(token))
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

    let getAdminTemplates = async (token) => {
        return await new Promise((resolve, reject) => {
            axios.get(adminAPI + 'ticketTemplates', getConfig(token))
                .then(response => { resolve(response.data); })
                .catch(error => { reject(error); });
        });
    }

    let patchTicket = async (token, ticket, filename) => {
        return await new Promise((resolve, reject) => {
            let body = {
                status: ticket.status,
                filename: filename,
                comment: ticket.comment
            }
            axios.patch(adminAPI + 'tickets/' + ticket.ticketId, body, getConfig(token))
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

    let createTicket = async (token, templateId, filename) => {
        return await new Promise((resolve, reject) => {
            const body = { ticketTemplateId: templateId, filename: filename, comment: "" };
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
        <APIContext.Provider value={{getTickets, getTemplates, createTemplate, getUsers, uploadFile, createTicket, getRequests, getAdminTemplates, patchTicket }}>
            {props.children}
        </APIContext.Provider>
    );
};

export { API, APIContext };