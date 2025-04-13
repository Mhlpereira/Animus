import { it, jest } from '@jest/globals';
import { Container } from "inversify";
import { beforeEach, describe } from "node:test";
import { IEventRepository } from "../event-interfaces";
import { EventService } from "../event-service";
import 'reflect-metadata';
import { EventModel } from '../event-model';



describe("EventService", () => {
    let container: Container;
    let mockEventRepository: jest.Mocked<IEventRepository>;
    let eventService: EventService;

    beforeEach(async () => {
        container = new Container();

        mockEventRepository = {
            createEventGroup: jest.fn(),
            deleteEvent: jest.fn(),
            getEventById: jest.fn(),
            addUserToEvent: jest.fn(),
            removeUserFromEvent: jest.fn(),
        } as jest.Mocked<IEventRepository>

        container.bind<IEventRepository>("IEventRepository").toConstantValue(mockEventRepository); 

        eventService = container.get<EventService>(EventService);
    });

    describe("createEventGroup", () => {
        it("should create an event successfully", async () => {
            const mockEvent: EventModel = {
                _id: "1",
                _ownerId: "ownerId",
                _date: new Date(),
                _hour: "10:00",
                _title: "Event Title",
                _description: "Event Description",
                _users: [],
                _createdAt: new Date(),
                _updatedAt: null,
            }
            mockEventRepository.createEventGroup.mockResolvedValue(mockEvent);

        }}