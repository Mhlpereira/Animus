import{ Connection } from 'mongoose';


export interface IMongoDB {
    connect(): Promise<Connection>
    getConnectionMongo(): Connection
    close(): Promise<void>
}

