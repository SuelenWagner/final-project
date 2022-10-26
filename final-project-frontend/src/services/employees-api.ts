import axios from "axios";
import { environment } from "../environment/environment";
import { iPositions } from "../models/Positions";
import { iProjects } from "../models/Projects";
import { iTechs } from "../models/Techs";


const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        "Content-type": "application/json"
    }
});


export const getAllEmployees = () => {
    return http.get("/employees");
};


export const getEmployeeById = (id: string) => {
    return http.get(`/employees/${id}`);
};

/*export const createEmployee = (username: string, password: string, fullName: string, birthDate: Date, email:string, startDate: Date, interesting: string, status: string, project: iProjects, position: iPositions, techs: iTechs, roles: iRoles) => {
    return http.post("/employees", {
        username,
        password,
        fullName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        project,
        position,
        techs,
        roles
    });
};*/

export const createEmployee = (username: string, password: string, fullName: string, birthDate: Date, email:string, startDate: Date, interesting: string, status: string, project: iProjects, position: iPositions, techs: iTechs) => {
    return http.post("/employees", {
        username,
        password,
        fullName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        project,
        position,
        techs
    });
};

// export const updatePosition = (id: string, name : string) => {
//     return http.put(`/positions/${id}`, {
//         name
//     });
// };

export const deleteEmployee = (id: string) => {
    return http.delete(`/employees/${id}`);
};
