export class CreateGroupEventDTO{
    ownerId: string;
    date: Date;
    hour: string;
    title: string;
    groupId: string;
    teamId?: string;
    description?: string;
}