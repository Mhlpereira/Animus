import { inject, injectable } from 'inversify'
import { IDatabaseConnection } from '../shared/interface/database-connection-interface'
import { UserCreateDTO } from './DTO/user-create-DTO'
import { UserModel } from './user-model'
import { v4 as uuid } from 'uuid'
import { IDatabase } from '../shared/interface/database-interface'
import { UpdateCustomerDTO } from './DTO/update-customer'


@injectable()
export class UserRepository {
    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async createUser(
        data: UserCreateDTO,
        options?: { connection?: IDatabaseConnection },
    ): Promise<{ user: UserModel }> {
        if (!data.email || !data.password) {
            throw new Error('Email or password is missing!')
        }

        console.log(data)
        const db = options?.connection ?? (await this.pg.getConnection())
        const created_at = new Date()
        const id = uuid()
        const active = true;
        try {
            await db.query('BEGIN')
            const result = await db.query(
                'INSERT INTO users (id, email, password, is_active, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING email',
                [id, data.email, data.password, active, created_at],
            )

            const user = new UserModel(result.rows[0])


            const customer = await db.query(
                'INSERT INTO customers (user_id, name, nickname, birthday, created_at, user_id) VALUES ($1, $2, $3, $4) RETURNING name, nickname',
                [
                    user.id,
                    data.name,
                    data.nickname,
                    data.birthday,
                ],
            )

            await db.query('COMMIT')

            return { user }
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error creating user: ${e.message}`)
        } finally {
            if (!options?.connection) {
                db.release()
            }
        }
    }

    async getUserId(id: string): Promise<string | null> {
        const db = await this.pg.getConnection()
        try {
            const userId = await db.query('SELECT id FROM users WHERE id = $1 and is_active = true', [
                id,
            ])
            if (!userId) {
                return null
            }
            return userId
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error creating user: ${e.message}`)
        } finally {
            db.release()
        }
    }

    async getUserByEmail(email: string): Promise<any | null> {
        const db = await this.pg.getConnection()
        try {
            const result = await db.query(
                'SELECT id, email, is_active FROM users WHERE email = $1',
                [email],
            )
            if (result.rows.length === 0) {
                return null
            }
    
            return result.rows[0];
        } finally {
            db.release()
        }
    }

    async getUserPassword(id: string): Promise<string> {
        const db = await this.pg.getConnection()

        try {
            const result = await db.query(
                'SELECT password FROM users WHERE id = $1',
                [id],
            )
            if (result.rows.length === 0) {
                throw new Error('User not found')
            }
            return result.rows[0].password
        } catch (e) {
            throw new Error(`Error fetching user password ${e.message}`)
        }
    }

    async changePassword(data: {
        id: string
        password: string
    }): Promise<boolean> {
        const db = await this.pg.getConnection()
        try {
            await db.query('BEGIN')
            const pwUpdatedAt = new Date()
            const result = await db.query(
                `UPDATE users SET password=$1, password_update_at=$2  where id=$3 VALUES ($1, $2, $3)`,
                [data.password, pwUpdatedAt, data.id],
            )

            await db.query('COMMIT')

            return result.rows > 0
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error updating password: ${e.message}`)
        } finally {
            db.release()
        }
    }

    async softDeleteUser(data:{id: string}): Promise<boolean>{
        const db = await this.pg.getConnection()
        try {
            await db.query('BEGIN')
            const active = false
            const result = await db.query(
                `UPDATE users SET is_active=1$  where id=$2 VALUES ($1, $2)`,
                [active, data.id],
            )

            await db.query('COMMIT')

            return result.rows > 0
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error updating password: ${e.message}`)
        } finally {
            db.release()
        }
    }

    async changeEmail(data: { id: string; email: string }): Promise<boolean> {
        const db = await this.pg.getConnection()
        try {
            await db.query('BEGIN')
            const updatedAt = new Date()
            const result = await db.query(
                `UPDATE users SET email=$1, update_at=$2  where id=$3 VALUES ($1, $2, $3)`,
                [data.email, updatedAt, data.id],
            )

            await db.query('COMMIT')

            return result.rows > 0
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error updating email: ${e.message}`)
        } finally {
            db.release()
        }
    }

    async updateCustomer(userId: string, data: UpdateCustomerDTO): Promise<boolean> {
        const db = await this.pg.getConnection();
        try {
            await db.query('BEGIN');
    
            const updates: string[] = [];
            const values: any[] = [];
            let index = 1;
    
            if (data.name !== undefined) {
                updates.push(`name = $${index}`);
                values.push(data.name);
                index++;
            }
            if (data.nickname !== undefined) {
                updates.push(`nickname = $${index}`);
                values.push(data.nickname);
                index++;
            }
    
            if (updates.length === 0) {
                throw new Error('Nenhum campo para atualizar foi fornecido.');
            }
    
            values.push(userId);
            const query = `UPDATE customers SET ${updates.join(', ')} WHERE user_id = $${index}`;
    
            const result = await db.query(query, values);
    
            await db.query('COMMIT');
    
            return result.rowCount > 0;
        } catch (e) {
            await db.query('ROLLBACK');
            throw new Error(`Erro ao atualizar customer: ${e.message}`);
        } finally {
            db.release();
        }
    }



}
