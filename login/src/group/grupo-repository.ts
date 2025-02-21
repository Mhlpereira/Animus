import { inject, injectable } from 'inversify'
import { IDatabase } from '../shared/interface/database-interface'
import { GroupModel } from './group-model'
import { IDatabaseConnection } from '../shared/interface/database-connection-interface'
import { v4 as uuid } from 'uuid'

@injectable()
export class GroupRepository {
    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async createGroup(data: {
        name: string
        owner_id: string
        description?: string
    }): Promise<{ group: GroupModel }> {
        const db = await this.pg.getConnection()
        const created_at = new Date()
        const id = uuid()
        try {
            await db.query('BEGIN')
            const result = await db.query(
                'INSERT INTO groups (id, name, owner_id, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [id, data.name, data.owner_id, data.description, created_at],
            )
            const group = new GroupModel(result.rows[0])

            await db.query('COMMIT')
            return { group }
        } catch (e) {
            await db.query('ROLLBACK')
            throw new Error(`Error creating group: ${e.message}`)
        } finally {
            db.release()
        }
    }

    async deleteGroup(data: { groupId: string }): Promise<boolean> {
        const db = await this.pg.getConnection()
        try {
            const result = db.query('DELETE FROM groups WHERE group_id = $1', [
                data.groupId,
            ])

            return !!result
        } catch (e) {
            throw new Error(`Error deleting group: ${e.message}`);
        } finally {
            db.release();
        }
    }

    async getOwnerId(
        group_id: string,
        options?: { connection?: IDatabaseConnection },
    ): Promise<string | null> {
        const db = options?.connection ?? (await this.pg.getConnection())
        try {
            const result = await db.query(
                'SELECT owner_id FROM groups WHERE id = $1',
                [group_id],
            )
            return result.rows.length ? result.rows[0].owner_id : null
        } catch (e) {
            throw new Error(`Error creating group: ${e.message}`)
        } finally {
            if (!options?.connection) {
                db.release()
            }
        }
    }
}
