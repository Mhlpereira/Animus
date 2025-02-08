import { PoolClient } from "pg";
import { Database } from "../database";
import { v4 as uuid } from "uuid";
import { CustomerModel } from "../customer/customer-model";
import { IUserModel } from "./user-interface";
import { RegisterDTO } from "../auth/DTO/register-DTO";
import { UserCreateDTO } from "./DTO/user-create-DTO";

export class UserModel implements IUserModel {
    id: string;
    email: string;
    password: string;
    created_at: Date;

    constructor(data: Partial<UserModel> = {}) {
        this.fill(data);
    }

    async createUser(
        data: UserCreateDTO,
        options?: { connection?: PoolClient }
    ): Promise<{user:UserModel}> {

        if (!data.email || !data.password) {
            throw new Error("Email or password is missing!");
        }

        console.log(data);
        const db = options?.connection ?? await Database.getClient();
        const created_at = new Date();
        const id = uuid();
        try {
            await db.query('BEGIN');
            const result = await db.query(
                'INSERT INTO users (id, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
                [id, data.email, data.password, created_at]
            );

            const user = new UserModel(result.rows[0]);
            console.log(user);

            await db.query('COMMIT');

            return {user};


        }catch(e){
            await db.query('ROLLBACK');
            throw new Error(`Error creating user: ${e.message}`);
        }
        finally{
            if (!options?.connection) {
                db.release();
            }
        }
    }

    async getUserById(id: string): Promise<UserModel | null> {
        const db = await Database.getClient();
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return new UserModel(result.rows[0]);
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        const db = await Database.getClient();
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return null;
        }
        return new UserModel(result.rows[0]);
    }

    fill(data: Partial<UserModel>): void {
        if (data.id !== undefined) this.id = data.id;
        if (data.email !== undefined) this.email = data.email;
        if (data.password !== undefined) this.password = data.password;
        if (data.created_at !== undefined) this.created_at = data.created_at;
    }
}