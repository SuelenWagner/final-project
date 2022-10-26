import { iProjects } from "./Projects";

export interface iClients {
    id: string;
    name: string;
    description: string;
    projects: iProjects[];
}

export interface iClientsData {
    data: iClients[];
}
