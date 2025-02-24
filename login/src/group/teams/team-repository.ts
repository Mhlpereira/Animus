import { inject, injectable } from "inversify";
import { IDatabase } from "../../shared/interface/database-interface";

@injectable()
export class TeamRepository{

    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async createTeam(){
        const db = await this.pg.getConnection();

        try{
            await db.query('BEGIN');
        }catch(e){

        }finally{
            db.release();
        }
    }
}