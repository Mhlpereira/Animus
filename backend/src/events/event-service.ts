import { inject, injectable } from 'inversify'
import { IEventRepository } from './event-interfaces'
import { ObjectId } from 'mongodb'
import { OutputGetGroupById } from './DTO/output-get-group-by-id'
import { OutputCreateGroupDto } from './DTO/Output-create-group-dto'

@injectable()
export class EventService {
    constructor(
        @inject('IEventRepository') private eventRepository: IEventRepository,
    ) {}

    async createEventGroup(data: {
        ownerId: string
        date: Date
        hour: string
        title: string
        groupId: string
        teamId?: string
        description?: string
    }): Promise<OutputCreateGroupDto> {

        const fmtOwnerId = this.idConverter(data.ownerId);
        const dataWithOwnerId = { ...data, ownerId: fmtOwnerId }
        const groupEvent = await this.eventRepository.createEventGroup(dataWithOwnerId)

        if(!groupEvent){
            throw new Error('Error creating event')
        }

        const groupEventDTO = new OutputCreateGroupDto();
        groupEventDTO.date = groupEvent.date;
        groupEventDTO.hour = groupEvent.hour;
        groupEventDTO.title = groupEvent.title;
        groupEventDTO.groupId = groupEvent.groupId;
    

        return groupEventDTO
    }

    async deleteEvent(id: string){


        await this.eventRepository.deleteEvent(id)
    }

    async getEventById(id: string): Promise<OutputGetGroupById> {
        const event = await this.eventRepository.getEventById(id);

        if(!event){
            throw new Error('Event not found')
        }

        const eventDTO = new OutputGetGroupById();
        eventDTO.id = event._id.toHexString();
        eventDTO.ownerId = event.ownerId.toHexString();
        eventDTO.date = event.date;
        eventDTO.hour = event.hour;
        eventDTO.title = event.title;
        eventDTO.groupId = event.groupId;
        eventDTO.teamId = event.teamId ? event.teamId : undefined ;
        eventDTO.description = event.description ? event.description : undefined;
        eventDTO.users = event.users ? event.users.map((user: ObjectId) => user.toHexString()) : undefined;


        return eventDTO
    }

    async addUserToEvent(eventId: string, userId: string): Promise<boolean> {
        const user = await this.eventRepository.addUserToEvent(eventId, userId);
        if(!user){
            throw new Error('Error adding user to event')
        }
        return true;
    }

    idConverter(id: string): ObjectId {
        return new ObjectId(id);
    }
}

