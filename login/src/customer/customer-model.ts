import { ICustomerData } from './customer-interface';



export class CustomerModel{
    private _id: string;
    private _name: string;
    private _nickname: string;
    private _birthday: Date;
    private _created_at: Date;
    private _updated_at?: Date;
    private _user_id: string;

    constructor(data: ICustomerData = {}) {
        this._id = data.id;
        this._name = data.name ;
        this._birthday = data.birthday ;
        this._created_at = data.created_at;
        this._updated_at = undefined;
        this._user_id = data.user_id;
    }

    get id(): string {
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get birthday(): Date{
        return this._birthday;
    }

    get createdAt(): Date{
        return this._created_at
    }

    get updatedAt(): Date{
        return this._updated_at;
    }

    get user_id(): string {
        return this._user_id;
    }

    set name(value: string){
        this._name = value;
    }

    set nickname(value: string){
        this._nickname = value;
    }

    set birthday(value: Date){
        this._birthday = value;
    }

    set updatedAt(value: Date){
        this._updated_at = value;
    }
}
