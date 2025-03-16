import { Db } from 'mongodb'

export interface IMongoDB {
    connect(): Promise<void>
    getDb(): Db
    close(): Promise<void>
}

