

export interface IGroupEvent {
    ownerId: string;
    date: Date;
    hour: string;
    title: string;
    groupId: string;
    teamId?: string;
    description?: string;
    users?: string[];
}


export interface IEventRepository {
    createEventGroup(data: {ownerId: string, date: Date, title: string, groupId: string, teamId?: string, description?: string, users?: string[]}): Promise<any>;
}

export interface IEventService {
    createEventGroup(data: {ownerId: string, date: Date, title: string, groupId: string, teamId?: string, description?: string, users?: string[]}): Promise<any>;
}