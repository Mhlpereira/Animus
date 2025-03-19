import { Socket } from 'socket.io'
import { inject } from 'inversify'
import { EventService } from '../events/event-service'
import { CreateGroupEventDTO } from '../events/DTO/create-group-event-dto'


export class EventSocket {
    constructor(@inject('EventService') private eventService: EventService) {}

    public initialize(io: Socket) {
        io.on('createEventGroup', async (data: CreateGroupEventDTO) => {
            try {
                const createdGroupEvent =
                    await this.eventService.createEventGroup(data)

                io.emit('eventCreated', createdGroupEvent)

                io.broadcast.emit('newEvent', createdGroupEvent)
            } catch (e) {
                io.emit('error', { message: 'Error creating event', e })
            }
        })
    }
}
