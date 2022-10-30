import axios from "axios";
import { environment } from "../environment/environment";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});


export const getAllClients = () => {
    return http.get("/clients");
};

export const getClientById = (id: string) => {
    return http.get(`/clients/${id}`);
};

export const createClient = (name: string, description: string) => {
    return http.post("/clients", {
        name,
        description
    });
};

export const updateClient = (id: string, name : string, description: string) => {
    return http.put(`/clients/${id}`, {
        name,
        description
    });
};

export const deleteClient = (id: string) => {
    return http.delete(`/clients/${id}`);
};
