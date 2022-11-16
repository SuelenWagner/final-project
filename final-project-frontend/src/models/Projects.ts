import { IClient } from "./Clients";
import { IEmployee } from "./Employee";

export enum EProjectStatus {
    WAITING_START = "WAITING_START",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    CANCELED = "CANCELED"
}
export interface IProject {
    id: string;
    name: string;
    description: string;
    startDate: Date | string;
    finishDate?: Date | string;
    status: string;
    client?: IClient;
    employees?: IEmployee[];
}
export interface IProjectData {
    data: IProject[];
}
