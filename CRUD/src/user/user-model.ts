import { Database } from "../shared/db/database";
import { v4 as uuid } from "uuid";
import { IUserModel } from "./user-interface";
import { UserCreateDTO } from "./DTO/user-create-DTO";
import { IDatabaseConnection } from "../shared/interface/database-interface";

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
        options?: { connection?: IDatabaseConnection }
    ): Promise<{ user: UserModel }> {

        if (!data.email || !data.password) {
            throw new Error("Email or password is missing!");
        }

        console.log(data);
        const db = options?.connection ?? await Database.getConnection();
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

            return { user };


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

    async getUserById(id: string): Promise<UserModel | null> {
        const db = await Database.getConnection();
        try {
            const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return null;
            }
            return new UserModel(result.rows[0]);
        } catch (e) {
            await db.query('ROLLBACK');
            throw new Error(`Error creating user: ${e.message}`);
        }
        finally {
            db.release();
        }
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        const db = await Database.getConnection();
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length === 0) {
                return null;
            }
            return new UserModel(result.rows[0]);
        } finally {
            db.release();
        }
    }

    fill(data: Partial<UserModel>): void {
        if (data.id !== undefined) this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        if (data.created_at !== undefined) this.created_at = data.created_at;
    }
}