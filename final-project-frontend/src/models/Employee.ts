import { iPositions } from "./Positions";
import { IProject } from "./Projects";
import { iTechs } from "./Techs";

export interface IEmployee {
    id: string;
    username: string;
    password: string; 
    fullName: string; 
    birthDate: Date;
    email:string;
    startDate: Date; 
    interesting: string; 
    status: string;
    project: IProject; 
    position: iPositions; 
    techs: iTechs;
    role: string;
}

export interface IEmployeeData {
    data: IEmployee[];
}
