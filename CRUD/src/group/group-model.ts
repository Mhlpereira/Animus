import { UserModel } from "../user/user-model";
import { Database } from "../shared/db/database";
import { v4 as uuid } from "uuid";
import { IDatabaseConnection } from "../shared/interface/database-interface";
import { CreateLevelGroup } from "./DTO/create-level-group-DTO";



export class GroupModel {
    id: string;
    name: string;
    owner_id: string;
    description: string;
    users: UserModel[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    constructor(data: Partial<GroupModel> = {}) {
        this.fill(data);
    }

    async createGroup(data: Partial<GroupModel>, options?: { connection?: IDatabaseConnection }): Promise<{ group: GroupModel }> {
        const db = options?.connection ?? await Database.getConnection();
        const created_at = new Date();
        const id = uuid();
        try {
            await db.query('BEGIN');
            const result = await db.query(
                'INSERT INTO groups (id, name, owner_id, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [id, data.name, data.owner_id, data.description, created_at]
            );
            const group = new GroupModel(result.rows[0]);
            await db.query('COMMIT');
            return { group };
        } catch (e) {
            await db.query('ROLLBACK');
            throw new Error(`Error creating group: ${e.message}`);
        } finally {
            if (!options?.connection) {
                db.release();
            }
        }
    }

    async getOwnerId(
        group_id: string,
        options?: { connection?: IDatabaseConnection }): Promise<string | null> {
        const db = options?.connection ?? await Database.getConnection();
        try {
            const result = await db.query("SELECT owner_id FROM groups WHERE id = $1", [group_id]);
            return result.rows.length ? result.rows[0].owner_id : null;
        } catch (e) {
            throw new Error(`Error creating group: ${e.message}`);
        } finally {
            if (!options?.connection) {
                db.release();
            }
        }
    }


    //fazer classe para pegar o id do payload no service  e add no dto
    //pegar o id e adicionar na criação no service
    //adicionar verificação de permissão para criar no service
    // 
    async createGroupLevel(createGroupLevelDTO: CreateLevelGroupDTO, options?: { connection?: IDatabaseConnection }): void{
        const db = options?.connection ?? await Database.getConnection();
        const id = uuid();
        try {
            const result = await db.query(
                'INSERT INTO group_level (id,  user_id, name, description) VALUES ($1, $2, $3, $4) RETURNING *',
                [id, user_id, createGroupLevel.name,  createGroupLevel.permission,]
            );
        } catch (e) {
            throw new Error(`Error creating group: ${e.message}`);
        } finally {
            if (!options?.connection) {
                db.release();
            }
        }

    }


    fill(data: Partial<GroupModel>) {
        this.id = data.id;
        this.name = data.name;
        this.owner_id = data.owner_id;
        this.description = data.description;
        this.users = data.users;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deleted_at = data.deleted_at;
    }
}