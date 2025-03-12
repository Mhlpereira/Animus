import { MongoClient, Db } from 'mongodb';
import { IMongoDB } from '../../interface/mongo-database-interface';

export class MongoDB implements IMongoDB {
    private client: MongoClient;
    private db: Db | null = null;

    constructor(private uri: string) {
        this.client = new MongoClient(this.uri);
    }

    async connect(): Promise<void> {
        if (!this.db) {
            await this.client.connect();
            this.db = this.client.db('myapp');
            console.log('Conectado ao MongoDB');
        }
    }

    getDb(): Db {
        if (!this.db) throw new Error('Banco de dados não inicializado');
        return this.db;
    }

    async close(): Promise<void> {
        await this.client.close();
        console.log('Conexão com o MongoDB fechada');
    }
}
