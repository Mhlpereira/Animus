import { inject, injectable } from 'inversify'
import { IEventRepository, IEventService } from './event-interfaces'
import { OutputCreateGroupDto } from './DTO/Output-create-group-dto'
import { CreateGroupEventDTO } from './DTO/create-group-event-dto'
import { EventModel } from './event-model'

@injectable()
export class EventService implements IEventService {
    constructor(
        @inject('IEventRepository') private eventRepository: IEventRepository,
    ) {}

    async createEventGroup(data: CreateGroupEventDTO): Promise<OutputCreateGroupDto> {
        const event = await this.eventRepository.createEventGroup(data)
        if(!event){
            throw new Error('Error creating event')
        }
        const groupEvent: OutputCreateGroupDto = {
            id: event.id,
            title: event.title,
            description: event.description,
        }
        return groupEvent
    }

    async deleteEvent(eventId: string): Promise<boolean> {
        const event = await this.getEventById(eventId);
        if(!event){
            throw new Error('Event not found')
        }
        await this.eventRepository.deleteEvent(eventId)

        return true;
    }

    async getEventById(id: string): Promise<EventModel> {
        const event = await this.eventRepository.getEventById(id);

        if(!event){
            throw new Error('Event not found')
        }
        return event
    }

    async addUserToEvent(eventId: string, userId: string): Promise<boolean> {
        const user = await this.eventRepository.addUserToEvent(eventId, userId);
        if(!user){
            throw new Error('Error adding user to event')
        }
        return true;
    }

    async removeUserFromEvent(eventId: string, userId: string): Promise<boolean> {
        const user = await this.eventRepository.removeUserFromEvent(eventId, userId);
        if(!user){
            throw new Error('Error removing user from event')
        }
        return true;           
    }

   
}

