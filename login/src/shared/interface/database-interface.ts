import { IDatabaseConnection } from "./database-connection-interface";


export interface IDatabase{
    getConnection(): Promise<IDatabaseConnection>;
}