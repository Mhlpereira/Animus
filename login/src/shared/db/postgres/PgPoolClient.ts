import { PoolClient } from 'pg';
import { IDatabaseConnection } from '../../interface/database-connection-interface';

export class PgPoolClient implements IDatabaseConnection {
  constructor(private client: PoolClient) {}

  async query(queryText: string, params?: any[]): Promise<any> {
    return this.client.query(queryText, params);
  }

  async connect(): Promise<void> {
        return;
  }

  release(): void {
    this.client.release();
  }
}