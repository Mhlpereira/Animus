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
                [id, data.name,data.nickname, data.birthday, created_at, data.userId],
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

    async getCustomerId(userId: String): Promise<string  | null>{
        const db =await this.pg.getConnection();    

        try{
            const customerId = db.query('SELECT id FROM customers WHERE user_id = $1', [userId]);
            
            if(!customerId){
                return null;
            }
            console.log(customerId); //verificar a saída
            return customerId;
        }catch(e){
            throw new Error(`Error finding user`);
        } finally {
            db.release();
        }

    }

}
