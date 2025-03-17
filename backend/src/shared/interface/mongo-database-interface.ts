import { Db } from 'mongodb'

export interface IMongoDB {
    connect(): Promise<Db>
    getDb(): Db
    close(): Promise<void>
}

