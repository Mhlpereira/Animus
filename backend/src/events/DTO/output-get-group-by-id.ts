export class OutputGetGroupById {
    id: string
    ownerId: string;
    name: string;
    date: Date;
    hour: string;
    title: string;
    groupId: string;
    teamId?: string;
    description?: string;
    users?: string[]; 
}