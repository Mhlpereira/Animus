import { Pool, PoolClient } from 'pg';

export class Database {
  private static instance: Pool;

  private constructor() { }

  public static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = new Pool({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        ssl: process.env.POSTGRES_SSL === 'true',
        max: 20, 
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000, 
      });
    }
    return Database.instance;
  }

  public static async getClient(): Promise<PoolClient> {
    const pool = Database.getInstance();
    return await pool.connect(); // Retorna um cliente específico da pool
  }
}

