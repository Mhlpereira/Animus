import { IMongoDB } from './../shared/interface/mongo-database-interface';
import { inject, injectable } from "inversify";

@injectable()
export class EventoRepository{

    constructor(@inject ('IMongoDB') private mongo: IMongoDB){}

    async createEventGroup(ownerId: string, date: Date, title: string, groupId: string, teamId?: string, description?: string, users?: string[]){
        const db = await this.mongo.connect();
        const groupEvent = await db.collection('events').insertOne({
            ownerId,
            date,
            title,
            groupId,
            teamId,
            description,
            users
        });
        return groupEvent;
    }
}