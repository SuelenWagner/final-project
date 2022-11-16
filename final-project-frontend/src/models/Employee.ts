import { IPosition } from "./Positions";
import { IProject } from "./Projects";
import { ITech } from "./Techs";

export interface IEmployee {
    id: string;
    username: string;
    password: string; 
    fullName: string; 
    birthDate: Date | string;
    email:string;
    startDate: Date | string; 
    interesting: string; 
    status: any;
    project: IProject; 
    position: IPosition; 
    techs: ITech;
    role: string;
}

export interface IEmployeeData {
    data: IEmployee[];
}
