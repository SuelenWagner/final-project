import axios from "axios";
import { environment } from "../environment/environment";
import { iPositions, iPositionsData } from "../models/Positions";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});


export const getAllPositions = () => {
    return http.get("/positions");
};

export const createPosition = (name: string) => {
    return http.post("/positions", {
        name
    });
};

// export const updatePosition = (name : string) => {
//     return http.put(`/positions/${id}`, {
//         name
//     })
// }

export const deletePosition = (id: string) => {
    return http.delete(`/positions/${id}`);
};
