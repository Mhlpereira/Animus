import { inject, injectable } from 'inversify'
import { IDatabase } from '../shared/interface/database-interface'
import { CustomerModel } from './customer-model'
import { CustomerCreateDTO } from './DTO/create-customer-DTO'
import { IDatabaseConnection } from '../shared/interface/database-connection-interface'
import { v4 as uuid } from 'uuid'

@injectable()
export class CustomerRepository {
    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async createCustomer(
        data: CustomerCreateDTO,
        options?: { connection?: IDatabaseConnection },
    ): Promise<{ customer: CustomerModel }> {
        const db = options?.connection ?? (await this.pg.getConnection())
        const id = uuid()
        const created_at = new Date()
        try {
            await db.query('BEGIN')

            const result = await db.query(
                'INSERT INTO customers (id, name, nickname, birthday, created_at, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, nickname',
                [
                    id,
                    data.name,
                    data.nickname,
                    data.birthday,
                    created_at,
                    data.userId,
                ],
            )
            const customer = new CustomerModel(result.rows[0])

            await db.query('COMMIT')

            return { customer }
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error creating user: ${e.message}`)
        } finally {
            if (!options?.connection) {
                db.release()
            }
        }
    }

    async getCustomerId(userId: String): Promise<string | null> {
        const db = await this.pg.getConnection()

        try {
            const customerId = await db.query(
                'SELECT id FROM customers WHERE user_id = $1',
                [userId],
            )

            if (!customerId) {
                return null
            }
            console.log(customerId) //verificar a saída
            return customerId
        } catch (e) {
            throw new Error(`Error finding user`)
        } finally {
            db.release()
        }
    }

    async changeName(data: { id: string; name: string }): Promise<boolean> {
        const db = await this.pg.getConnection()
        try {
            await db.query('BEGIN')
            const result = await db.query(
                `UPDATE customer SET name=$1 where id=$2 VALUES ($1, $2)`,
                [data.name, data.id],
            )

            await db.query('COMMIT')

            return result.rows > 0
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error updating name: ${e.message}`)
        } finally {
            db.release()
        }
    }

    async changeNickname(data: { id: string; nickname: string }): Promise<boolean> {
        const db = await this.pg.getConnection()
        try {
            await db.query('BEGIN')
            const result = await db.query(
                `UPDATE customer SET nickname=$1 where id=$2 VALUES ($1, $2)`,
                [data.nickname, data.id],
            )

            await db.query('COMMIT')

            return result.rows > 0
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error updating nickname: ${e.message}`)
        } finally {
            db.release()
        }
    }
}
