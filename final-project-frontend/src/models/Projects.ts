import { IClient } from "./Clients";
import { IEmployee } from "./Employee";

export enum EProjectStatus {
    WAITING_START = "Aguardando Início",
    IN_PROGRESS = "Em Progresso",
    DONE = "Concluído",
    CANCELED = "Cancelado"
}

export interface IProject {
    id: string;
    name: string;
    description: string;
    //startDate: Date | string;
    //finishDate: Date | string;
    status: EProjectStatus | string;
    client?: IClient;
    employees?: IEmployee[];
}

export interface IProjectData {
    data: IProject[];
}
