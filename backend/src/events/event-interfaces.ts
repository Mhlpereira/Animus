import { WithId, Document, ObjectId } from "mongodb";
import { CreateGroupEventDTO } from "./DTO/create-group-event-dto";
import { OutputGetGroupById } from "./DTO/output-get-group-by-id";


export interface IEventRepository {
    createEventGroup(data: {ownerId: ObjectId, date: Date, hour: string,title: string, groupId: string, teamId?: string,description?: string}): Promise<any>;
    deleteEvent(id: string): Promise<void>;
    getEventById(id: string): Promise<WithId<Document>| null>;
    addUserToEvent(eventId: string, userId: string): Promise<Document>;
}

export interface IEventService {
    createEventGroup(data: CreateGroupEventDTO): Promise<CreateGroupEventDTO>;
    deleteEvent(id: string): Promise<void>;
    getEventById(id: string): Promise<OutputGetGroupById>;
    addUserToEvent(eventId: string, userId: string): Promise<boolean>;
}