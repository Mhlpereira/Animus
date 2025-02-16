import { inject, injectable } from 'inversify'
import { IDatabase } from '../shared/interface/database-interface'
import { CustomerModel } from './customer-model'
import { CustomerCreateDTO } from './DTO/create-customer-DTO'
import { IDatabaseConnection } from '../shared/interface/database-connection-interface'
import { v4 as uuid } from 'uuid'

@injectable()
export class CustomerRepository {
    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async createUser(
            data: CustomerCreateDTO,
            options?: { connection?: IDatabaseConnection },
        ): Promise<{ customer: CustomerModel }> {
            const db = options?.connection ?? (await this.pg.getConnection())
            const id = uuid()
        const created_at = new Date()
        try {
            await db.query('BEGIN')

            const result = await db.query(
                'INSERT INTO customers (id, name, birthday, created_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [id, data.name, data.birthday, created_at, data.userId],
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
}
