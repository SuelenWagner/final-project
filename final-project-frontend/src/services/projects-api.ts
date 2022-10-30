import axios from "axios";
import { environment } from "../environment/environment";
import { IClient } from "../models/Clients";
import { EProjectStatus } from "../models/Projects";

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

export const createProject = (name: String, description: String) => {
    return http.post("/projects", {
        name,
        description
    });
};

export const updateProject = (id: string, name: String, description: String) => {
    return http.put(`/projects/${id}`, {
        name,
        description
    });
};

export const deleteProject = (id: string) => {
    return http.delete(`/projects/${id}`);
};
