import { injectable } from "inversify";
import { IEventData, IGroupEventData } from "./event-interfaces";

@injectable()
export class EventModel{
    private _id: string;
    private _ownerId: string;
    private _date: Date;
    private _hour: string;
    private _title: string;
    private _description?: string;
    private _users?: string[];
    private _createdAt?: Date;
    private _updatedAt?: Date;

    constructor( data: IEventData = {}
    ) {
        this._id = data.id;
        this._ownerId = data.ownerId;
        this._date = data.date;
        this._hour = data.hour;
        this._title = data.title;
        this._description = data.description;
        this._users = data.users;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
    }

    get id(): string{
        return this._id;
    }
    get ownerId(): string{
        return this._ownerId;
    }
    get date(): Date{
        return this._date;
    }
    get hour(): string{
        return this._hour;
    }
    get title(): string{
        return this._title;
    }
    get description(): string | undefined{
        return this._description;
    }
    get users(): string[] | undefined{
        return this._users;
    }
    get createdAt(): Date | undefined{
        return this._createdAt;
    }
    get updatedAt(): Date | undefined{
        return this._updatedAt;
    }
    set description(value: string | undefined){
        this._description = value;
    }
    set users(value: string[] | undefined){
        this._users = value;
    }
    set date(value: Date){
        this._date = value;
    }
    set hour(value: string){
        this._hour = value;
    }
    set title(value: string){
        this._title = value;
    }
    set ownerId(value: string){
        this._ownerId = value;
    }
    set updatedAt(value: Date | undefined){
        this._updatedAt = value;
    }
}

@injectable()
export class GroupEvent extends Event {
    private _groupId: string;
    private _teamId?: string;

    constructor(data: IGroupEventData = {}) {
        super(data);
        this._groupId = data.groupId;
        this._teamId = data.teamId;
    }
    get groupId(): string {
        return this._groupId;
    }
    get teamId(): string | undefined {
        return this._teamId;
    }
    set groupId(value: string) {
        this._groupId = value;
    }
    set teamId(value: string | undefined) {
        this._teamId = value;
    }
}
