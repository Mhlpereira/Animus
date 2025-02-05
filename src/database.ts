import { Pool, PoolClient } from 'pg';
import { config } from 'dotenv';

config();

export class Database {
  private static instance: Pool;
  private constructor() { }

  public static getInstance(): Pool {
    if (!Database.instance) { 
    const host = process.env.POSTGRES_HOST;
    const user = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD as string;
    const db = process.env.POSTGRES_DB;
    const port = parseInt(process.env.POSTGRES_PORT || '5432', 10);
    const ssl = process.env.POSTGRES_SSL === 'true';

    if (!host || !user || !password || !db) {
      throw new Error('Missing required environment variables: POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB');
    }

    Database.instance = new Pool({
      host,
      user,
      password,
      database: db,
      port,
      ssl,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    }

  
    
    console.log("Connected to PostgreSQL!");

    Database.instance.on("error", (e) => {
      console.error("Error in Postgres intance:", e);
    });

    return Database.instance;
  }

  public static async getClient(): Promise<PoolClient> {
    const pool = Database.getInstance();
    return await pool.connect(); // Retorna um cliente específico da pool
  }
}

