import { Db } from 'mongodb'

export interface IMongoDB {
    connect(): Promise<void>
    getDb(): Db
    close(): Promise<void>
}

mongodb://process.env.MONGO_USER:process.env.MONGO_PASSWORD@localhost:27017