import { PoolClient } from "pg";
import { Database } from "../database";

export class UserModel{
    id: string;
    email: string;
    password: string;
    created_at: Date;

    constructor(data: Partial<UserModel>){
        this.fill(data);
    }

    static async create(
        data: {
            email: string,
            password: string
        },
        options?: {connection?: PoolClient}
    ): Promise<UserModel> {
        const db = options?.connection ?? Database.getClient();
        const created_at = new Date();
        const hashedPassword = UserModel.hashPassword(data.password);
        const [result] = await db.query('')
        
    }


    static hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10); 
      }
    
      static comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
      }



    fill(data: Partial<UserModel>): void {
        if (data.id !== undefined) this.id = data.id;
        if (data.email !== undefined) this.email = data.email;
        if (data.password !== undefined) this.password = data.password;
        if (data.created_at !== undefined) this.created_at = data.created_at;
      }
}