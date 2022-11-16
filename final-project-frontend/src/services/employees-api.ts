import axios from "axios";
import { environment } from "../environment/environment";
import { IPosition } from "../models/Positions";
import { IProject } from "../models/Projects";
import { ITech } from "../models/Techs";


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

export const createEmployee = (username: string, password: string, fullName: string, birthDate: string, email:string, startDate: string, interesting: string, status: string, role: string) => {
    return http.post("/employees", {
        username,
        password,
        fullName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        role
    });
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

// export const createEmployee = (username: string, password: string, fullName: string, birthDate: Date, email:string, startDate: Date, interesting: string, status: string, project: IProject, position: IPosition, techs: ITech) => {
//     return http.post("/employees", {
//         username,
//         password,
//         fullName,
//         birthDate,
//         email,
//         startDate,
//         interesting,
//         status,
//         project,
//         position,
//         techs
//     });
// };

export const updateEmployee = (id: string, username : string, password: string, fullName: string, birthDate: string, email: string, startDate: string, interesting: string, status: string, role: string) => {
    return http.put(`/employees/${id}`, {
        username,
        password,
        fullName,
        birthDate,
        email,
        startDate,
        interesting,
        status,
        role
    });
};

export const deleteEmployee = (id: string) => {
    return http.delete(`/employees/${id}`);
};
