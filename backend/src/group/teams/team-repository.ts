import { inject, injectable } from "inversify";
import { IDatabase } from "../../shared/interface/database-interface";
import {v4 as uuid} from 'uuid';
import { TeamModel } from "./team-model";
import { CreateTeamDTO } from "../DTO/create-team-DTO";
import { ITeamRepository } from "./team-interface";

@injectable()
export class TeamRepository implements ITeamRepository{

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
            throw new e('Error creating team:', e.message);
        }finally{
            db.release();
        }
    }

    async getUserByName(teamId: string, name: string): Promise<{ id: number; name: string; email: string }[]> {
        const db = await this.pg.getConnection();
        try {
            const result = await db.query(`
                SELECT id, name, email
                FROM users
                WHERE team_id = $1
                AND name ILIKE $2;
            `, [teamId, `%${name}%`]);
            return result.rows;
        } catch (e) {
            throw new e('Error fetching users', e.message);
        }finally{
            db.release();
        }
    }
}