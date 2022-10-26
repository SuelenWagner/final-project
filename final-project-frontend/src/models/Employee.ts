import { iPositions } from "./Positions";
import { iProjects } from "./Projects";
import { iTechs } from "./Techs";

export interface iEmployees {
    username: string;
    password: string; 
    fullName: string; 
    birthDate: Date;
    email:string;
    startDate: Date; 
    interesting: string; 
    status: string;
    project: iProjects; 
    position: iPositions; 
    techs: iTechs;

}

export interface iEmployeesData {
    data: iEmployees[];
}
