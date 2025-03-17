import { inject, injectable } from 'inversify'
import { IEventRepository, IGroupEvent } from './event-interfaces'

@injectable()
export class EventService {
    constructor(
        @inject('IEventRepository') private eventRepository: IEventRepository,
    ) {}

    async createEventGroup(data: {
        ownerId: string
        date: Date
        title: string
        groupId: string
        teamId?: string
        description?: string
        users?: string[]
    }): Promise<any> {
        const groupEvent = await this.eventRepository.createEventGroup(data)

        if(!groupEvent){
            throw new Error('Error creating event')
        }

        return groupEvent
    }
}
