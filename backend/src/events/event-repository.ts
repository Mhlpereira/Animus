import { inject, injectable } from 'inversify';
import { IEventRepository } from './event-interfaces';
import { IDatabase } from '../shared/interface/database-interface';
import { EventModel } from './event-model';
import { CreateGroupEventDTO } from './DTO/create-group-event-dto';
import { IDatabaseConnection } from '../shared/interface/database-connection-interface';
import { v4 as uuid } from 'uuid'



@injectable()
export class EventRepository implements IEventRepository{

    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async createEventGroup(data: CreateGroupEventDTO): Promise<EventModel> {
        const db = await this.pg.getConnection()
        const created_at = new Date()
        const id = uuid()
        try{
            await db.query('BEGIN')
            const result = await db.query(
                'INSERT INTO events (id, owner_id, date, hour, title, group_id, team_id, description, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
                [id, data.ownerId, data.date, data.hour, data.title, data.groupId, data.teamId ?? null ,data.description ?? null ,created_at],
            )

            const event = new EventModel(result.rows[0])

            await db.query('COMMIT')

            return event
        }catch(e){
            await db.query('ROLLBACK')
            throw new Error(`Error creating event: ${e.message}`)
        }finally{
                db.release()
        }

    }

    async deleteEvent(id: string): Promise<void> {
        const db = await this.pg.getConnection()
        try{
            await db.query('BEGIN')
            await db.query('DELETE FROM events WHERE id = $1', [id])
            await db.query('COMMIT')
        }catch(e){
            await db.query('ROLLBACK')
            throw new Error(`Error deleting event: ${e.message}`)
        }finally{
            db.release()
        }
    }

    async getEventById(id: string): Promise<EventModel | null> {
        const db = await this.pg.getConnection()
        try{
            const result = await db.query('SELECT * FROM events WHERE id = $1', [id])
            if(result.rows.length === 0){
                return null
            }
            return new EventModel(result.rows[0])
        }catch(e){
            throw new Error(`Error getting event: ${e.message}`)
        }finally{
            db.release()
        }
    }

    async confirmInGroupEvent(id: string): Promise<>{
        
    }

    async addUserToEvent(eventId: string, userId: string): Promise<boolean> {
        const db = await this.pg.getConnection()
        try{
            await db.query('BEGIN')
            await db.query('UPDATE events SET users = array_append(users, $1) WHERE id = $2', [userId, eventId])
            await db.query('COMMIT')
            return true
        }catch(e){
            await db.query('ROLLBACK')
            throw new Error(`Error adding user to event: ${e.message}`)
        }finally{
            db.release()
        }
    }

    async removeUserFromEvent(eventId: string, userId: string): Promise<boolean> {
        const db = await this.pg.getConnection()
        try{
            await db.query('BEGIN')
            await db.query('UPDATE events SET users = array_remove(users, $1) WHERE id = $2', [userId, eventId])
            await db.query('COMMIT')
            return true
        }catch(e){
            await db.query('ROLLBACK')
            throw new Error(`Error removing user from event: ${e.message}`)
        }finally{
            db.release()
        }
    }
}