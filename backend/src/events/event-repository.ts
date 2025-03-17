import { IMongoDB } from '../shared/interface/mongo-database-interface';
import { inject, injectable } from "inversify";
import { IEventRepository } from './event-interfaces';

@injectable()
export class EventRepository implements IEventRepository{

    constructor(@inject ('IMongoDB') private mongo: IMongoDB){}

    async createEventGroup(data:{ownerId: string, date: Date, title: string, groupId: string, teamId?: string, description?: string, users?: string[]}): Promise<any>{
        const db = await this.mongo.connect();
        const groupEvent = await db.collection('events').insertOne(data);

        return groupEvent;
    }
}