import { IPosition } from "./Positions";
import { IProject } from "./Projects";
import { ITech } from "./Techs";

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
    position: IPosition; 
    techs: ITech;
    role: string;
}

export interface IEmployeeData {
    data: IEmployee[];
}
