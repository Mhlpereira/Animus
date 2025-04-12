import mongoose, { Connection } from 'mongoose';
import { IMongoDB } from '../../interface/mongo-database-interface';

export class MongoDB implements IMongoDB {
    private connection: Connection | null = null;

    constructor(private uri: string) {}

    async connect(): Promise<Connection> {
        if (!this.connection) {
            await mongoose.connect(this.uri, {
                dbName: 'events', 
            });
            this.connection = mongoose.connection;
            console.log('Connect to mongoDB');
        }
        return this.connection;
    }

    getConnectionMongo(): Connection {
        if (!this.connection) throw new Error('Failed to connect to mongoDB');
        return this.connection;
    }

    async close(): Promise<void> {
        if (this.connection) {
            await mongoose.disconnect();
            this.connection = null;
            console.log('Closed connection to mongoDB');
        }
    }
}