export interface IDatabaseConnection {
    query(queryText: string, params?: any[]): Promise<any>;
    connect(): Promise<void>;
    release(): void;
}