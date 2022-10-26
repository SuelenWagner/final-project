import axios from "axios";
import { environment } from "../environment/environment";
import { iClients } from "../models/Clients";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});


export const getAllProjects = () => {
    return http.get("/projects");
};

export const getProjectById = (id: string) => {
    return http.get(`/projects/${id}`);
};

export const createProject = (name: string, description: string, startDate: Date, finishDate: Date, status: string, client: iClients) => {
    return http.post("/projects", {
        name,
        description, 
        startDate,
        finishDate,
        status,
        client
    });
};

//Falta o PUT

export const deleteProject = (id: string) => {
    return http.delete(`/projects/${id}`);
};
