import axios from "axios";
import { environment } from "../environment/environment";
import { IClient } from "../models/Clients";

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

export const createProject = (name: String, description: String, startDate: string, finishDate: string, status: string, client: IClient) => {
    return http.post("/projects", {
        name,
        description,
        startDate,
        finishDate,
        status,
        client
    });
};

export const updateProject = (id: string, name: String, description: String, startDate: string, finishDate: string, status: string, client: IClient) => {
    return http.put(`/projects/${id}`, {
        name,
        description,
        startDate,
        finishDate,
        status,
        client
    });
};

export const deleteProject = (id: string) => {
    return http.delete(`/projects/${id}`);
};
