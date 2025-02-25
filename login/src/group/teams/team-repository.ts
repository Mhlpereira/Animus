import { inject, injectable } from "inversify";
import { IDatabase } from "../../shared/interface/database-interface";
import {v4 as uuid} from 'uuid';
import { TeamModel } from "./team-model";
import { CreateTeamDTO } from "../DTO/create-team-DTO";

@injectable()
export class TeamRepository{

    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async createTeam(data: CreateTeamDTO): Promise<TeamModel>{
        const db = await this.pg.getConnection();

        try{
            await db.query('BEGIN');
            const id = uuid()
            const result = await db.query('INSERT INTO teams ( id, name, horario_json, instructor_id, group_id) VALUES ($1,$2,$3,$4,$5) RETURNING name',
                [id, data.name, JSON.stringify(data.horarioJson), data.instructorId, data.groupId]);
            
            const {team} = result.rows[0];
            await db.query('COMMIT');
            return team    
        }catch(e){

        }finally{
            db.release();
        }
    }
}