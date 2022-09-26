import axios from "axios";
import { environment } from "../environment/environment";
//import { iTechs, iTechsData } from "../models/Techs";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});


export const getAllTechs = () => {
    return http.get("/techs");
};

export const createTech = (name: string) => {
    return http.post("/techs", {
        name
    });
};

export const deleteTech = (id: string) => {
    return http.delete(`/techs/${id}`);
};
