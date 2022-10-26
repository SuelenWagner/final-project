import { iClients } from "./Clients";

export interface iProjects {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    finishDate: Date;
    status: string;
    client: iClients;

}

export interface iProjectsData {
    data: iProjects[];
}
