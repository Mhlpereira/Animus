import { Equals } from 'class-validator';
import { inject, injectable } from "inversify";
import { IDatabaseConnection } from "../shared/interface/database-connection-interface";
import { UserCreateDTO } from "./DTO/user-create-DTO";
import { UserModel } from "./user-model";
import {v4 as uuid} from 'uuid';
import { IDatabase } from "../shared/interface/database-interface";

@injectable()
export class UserRepository{

    constructor(@inject('IDatabase') private pg: IDatabase ){}

    async createUser(
           data: UserCreateDTO,
           options?: { connection?: IDatabaseConnection }
       ): Promise<{ user: UserModel }> {
   
           if (!data.email || !data.password) {
               throw new Error("Email or password is missing!");
           }
   
           console.log(data);
           const db = options?.connection ?? await this.pg.getConnection();
           const created_at = new Date();
           const id = uuid();
           try {
               await db.query('BEGIN');
               const result = await db.query(
                   'INSERT INTO users (id, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
                   [id, data.email, data.password, created_at]
               );
   
               const user = new UserModel(result.rows[0]);
   
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
            const db = await this.pg.getConnection();
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
            const db = await this.pg.getConnection();
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

    async getUserPassword(id:string): Promise<string>{
        const db = await this.pg.getConnection();

        try{
            const result = await db.query('SELECT password FROM users WHERE id = $1', [id])
           if(result.rows.length === 0 ){
            throw new Error ('User not found')
           }
           return result.rows[0].password;
        } catch(e){
            throw new Error(`Error fetching user password ${e.message}`)
        }
    }

    async changePassword(data: {id: string, password: string}): Promise<boolean>{
        const db = await this.pg.getConnection();
        try{
            const result = await db.query(`UPDATE users SET password=$1  where id=$2`,
                [data.password, data.id]
            )
            return result.rows > 0;
        }catch(e){
            throw new Error(`Error updating password: ${e.message}`);
        }finally {
            db.release();
        }
    }   
}
