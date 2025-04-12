import { MongoDB } from './mongo-singleton';
import { IMongoDB } from '../../interface/mongo-database-interface';

export class DatabaseFactory {
    private static instance: IMongoDB | null = null;

    public static async getDatabase(): Promise<IMongoDB> {
        if (!DatabaseFactory.instance) {
            const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017`;
            DatabaseFactory.instance = new MongoDB(uri);
            await DatabaseFactory.instance.connect();
        }
        return DatabaseFactory.instance;
    }

    public static async closeDatabase(): Promise<void> {
        if (DatabaseFactory.instance) {
            await DatabaseFactory.instance.close();
            DatabaseFactory.instance = null;
        }
    }
}