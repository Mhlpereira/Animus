import { Pool } from 'pg';

export class Database {
  private static instance: Pool;

  private constructor() {} 

  public static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = new Pool({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        ssl: process.env.POSTGRES_SSL === 'true',
        max: 20, // Número máximo de conexões no pool
        idleTimeoutMillis: 1000, // Fecha conexões inativas após 1s
        connectionTimeoutMillis: 1000, // Timeout ao conectar
      });
    }
    return Database.instance;
  }
}
