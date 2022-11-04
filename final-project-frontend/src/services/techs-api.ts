import axios from "axios";
import { environment } from "../environment/environment";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});

export const getAllTechs = () => {
    return http.get("/techs");
};

export const getTechById = (id: string) => {
    return http.get(`/techs/${id}`);
};

export const createTech = (name: string) => {
    return http.post("/techs", {
        name
    });
};

export const updateTech = (id: string, name: string) => {
    return http.put(`/techs/${id}`, {
        name
    });
};

export const deleteTech = (id: string) => {
    return http.delete(`/techs/${id}`);
};
