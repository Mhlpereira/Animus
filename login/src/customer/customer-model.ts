import { CustomerCreateDTO } from './DTO/create-customer-DTO';
import { v4 as uuid } from 'uuid';
import { Database } from '../shared/db/databasePool';
import { ICustomerModel } from './customer-interface';
import { IDatabaseConnection } from '../shared/interface/database-connection-interface';


export class CustomerModel implements ICustomerModel{
    id: string;
    name: string;
    birthday: Date;
    created_at: Date;
    updated_at?: Date;
    user_id: string;

    constructor(data: Partial<CustomerModel> = {}) {
        this.fill(data);
    }

    async createCustomer(data: CustomerCreateDTO,
        options?: { connection?: IDatabaseConnection }): Promise<{ customer: CustomerModel }> {
        const db = options?.connection ?? await Database.getConnection();
        const id = uuid();
        const created_at = new Date();
        try {
            await db.query('BEGIN');

            const result = await db.query(
                'INSERT INTO customers (id, name, birthday, created_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [id, data.name, data.birthday, created_at, data.userId]
            );
            const customer = new CustomerModel (result.rows[0]);

            await db.query('COMMIT');

            return {customer};
        } catch (e) {
            await db.query('ROLLBACK');
            throw new Error(`Error creating user: ${e.message}`);
        }
        finally {
            if (!options?.connection) {
                db.release();
            }
        }
    }
    fill(data: Partial<CustomerModel>): void {
        if (data.id !== undefined) this.id = data.id;
        if (data.name !== undefined) this.name = data.name;
        if (data.birthday !== undefined) this.birthday = data.birthday;
        if (data.updated_at !== undefined) this.updated_at = data.updated_at;
        if (data.created_at !== undefined) this.created_at = data.created_at;
    }
}
