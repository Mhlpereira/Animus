import { inject } from "inversify";
import { EventModel } from "./event-model";
import { CreateGroupEventDTO } from "./DTO/create-group-event-dto";
import { OutputCreateGroupDto } from "./DTO/Output-create-group-dto";
import { IEventService } from "./event-interfaces";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";

@controller('/events')
export class EventController{

    constructor(@inject('IEventService') private eventService: IEventService) {}

    @httpPost('/create')
    async createEventGroup(eventData: CreateGroupEventDTO): Promise<OutputCreateGroupDto> {
        return await this.eventService.createEventGroup(eventData);
    }

    @httpDelete('/delete')
    async deleteEvent(eventId: string): Promise<boolean> {
        return await this.eventService.deleteEvent(eventId);
    }

    @httpGet('/search')
    async getEventById(eventId: string): Promise<EventModel> {
        return await this.eventService.getEventById(eventId);
    }

    @httpPost('/addUser')
    async addUserToEvent(eventId: string, userId: string): Promise<boolean> {
        return await this.eventService.addUserToEvent(eventId, userId);
    }

    @httpPost('/removeUser')
    async removeUserFromEvent(eventId: string, userId: string): Promise<boolean> {
        return await this.eventService.removeUserFromEvent(eventId, userId);
    }

}