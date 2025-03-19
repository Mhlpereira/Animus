import { CreateGroupEventDTO } from './DTO/create-group-event-dto';
import { IMongoDB } from '../shared/interface/mongo-database-interface';
import { inject, injectable } from "inversify";
import { IEventRepository } from './event-interfaces';
import { WithId, Document, ObjectId } from 'mongodb';

@injectable()
export class EventRepository implements IEventRepository{

    constructor(@inject ('IMongoDB') private mongo: IMongoDB){}

    async createEventGroup(data:{ownerId: ObjectId, date: Date, hour: string, title: string, groupId: string,  teamId?: string,  description?: string}): Promise<any>{
        const db = await this.mongo.connect();
        const groupEvent = await db.collection('events').insertOne(data);
        return groupEvent;
    }

    async addUserToEvent(eventId: string, userId: string): Promise<Document>{
        const db = await this.mongo.connect();
        const user = await db.collection('events').updateOne({ _id: new ObjectId(eventId) }, { $addToSet: { users: new ObjectId(userId) } });
        return user;
    }


    async getEventById(id: string): Promise<WithId<Document>| null>{
        const db = await this.mongo.connect();
        const event = await db.collection('events').findOne({ _id: new ObjectId(id) }) ;

        return event;
    }

    async deleteEvent(id: string): Promise<void> {
        const db = await this.mongo.connect();
        await db.collection('events').deleteOne({ _id: new ObjectId(id) });
    }


}