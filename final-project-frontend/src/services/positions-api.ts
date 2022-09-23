import axios from "axios";
import { environment } from "../environment/environment";
import { iPositionsData } from "../models/Positions";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});


export const getAllPositions = () => {
    return http.get<iPositionsData>("/positions");
};

export const createPosition = (name: string) => {
    return http.post("/positions", {
        name
    });
};

export const deletePosition = (id: string) => {
    return http.delete(`/positions/${id}`);
};
