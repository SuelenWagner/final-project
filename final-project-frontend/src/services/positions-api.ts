import axios from "axios";
import { environment } from "../environment/environment";
import { IPosition, IPositionData } from "../models/Positions";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});

export const getAllPositions = () => {
    return http.get("/positions");
};


export const getPositionById = (id: string) => {
    return http.get(`/positions/${id}`);
};

export const createPosition = (name: string) => {
    return http.post("/positions", {
        name
    });
};

export const updatePosition = (id: string, name : string) => {
    return http.put(`/positions/${id}`, {
        name
    });
};

export const deletePosition = (id: string) => {
    return http.delete(`/positions/${id}`);
};
