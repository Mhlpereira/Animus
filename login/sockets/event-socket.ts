import { Socket } from 'socket.io'
import { inject } from 'inversify'
import { EventService } from '../src/events/event-service'
import { IGroupEvent } from '../src/events/event-interfaces'

export class EventSocket {
    constructor(@inject('EventService') private eventService: EventService) {}

    public initialize(io: Socket) {
        io.on('createEventGroup', async (data: IGroupEvent) => {
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
