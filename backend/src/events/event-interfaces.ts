import { CreateGroupEventDTO } from "./DTO/create-group-event-dto";
import { OutputGetGroupById } from "./DTO/output-get-group-by-id";
import { OutputCreateGroupDto } from "./DTO/Output-create-group-dto";
import { EventModel } from "./event-model";

export interface IEventData {
    id?: string;
    ownerId?: string;
    date?: Date;
    hour?: string;
    title?: string;
    teamId?: string;
    description?: string;
    users?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IGroupEventData extends IEventData {
    groupId: string;
    teamId?: string;
}

export interface IEventRepository {
    createEventGroup(data: CreateGroupEventDTO): Promise<EventModel>;
    deleteEvent(id: string): Promise<void>;
    getEventById(id: string): Promise<EventModel | null>;
    addUserToEvent(eventId: string, userId: string): Promise<boolean>;
    removeUserFromEvent(eventId: string, userId: string): Promise<boolean>;
}
export interface IEventService {
    createEventGroup(data: CreateGroupEventDTO): Promise<OutputCreateGroupDto>;
    deleteEvent(eventId: string): Promise<boolean>;
    getEventById(id: string): Promise<EventModel>;
    addUserToEvent(eventId: string, userId: string): Promise<boolean>;
    removeUserFromEvent(eventId: string, userId: string): Promise<boolean>;
}