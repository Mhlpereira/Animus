import { IDatabaseConnection } from "../interface/database-connection-interface";
import { IDatabase } from "../interface/database-interface";
import { DatabasePool } from "./databasePool";
import { PgPoolClient } from "./PgPoolClient";

export class PgDatabase implements IDatabase{
    public async getConnection(): Promise<IDatabaseConnection> {
        const client = await DatabasePool.connect()
        return new PgPoolClient(client); 
      }
}