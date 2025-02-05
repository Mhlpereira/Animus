import { v4 as uuid } from 'uuid';

export class CustomerModel{
    id: string;
    name: string;
    birthday: Date;
    created_at: Date;
    updated_at?: Date;

    constructor(data: Partial<CustomerModel> = {}) {
        this.fill(data);
    }

    static async create(db, data){
        const id = uuid();
        const created_at = new Date();
        const result = await db.query(
            'INSERT INTO customers (id, name, birthday, created_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, data.name, data.birthday, created_at, data.userId]
        );
        const customer = result.rows[0];
        console.log(customer);
        return customer;
    }

    fill(data: Partial<CustomerModel>): void {
        if (data.id !== undefined) this.id = data.id;
        if (data.name !== undefined) this.name = data.name;
        if (data.birthday !== undefined) this.birthday = data.birthday;
        if (data.updated_at !== undefined) this.updated_at = data.updated_at;
        if (data.created_at !== undefined) this.created_at = data.created_at;
    }
}