import { IProject } from "./Projects";

export interface IClient {
    id: string;
    name: string;
    description: string;
    projects?: IProject[];
}

export interface IClientData {
    data: IClient[];
}
