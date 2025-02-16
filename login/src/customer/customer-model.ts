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
        this.fill(data);
    }

    
    fill(data: ICustomerData): void {
        this._id = data.id;
        this._name = data.name ;
        this._birthday = data.birthday ;
        this._created_at = data.created_at;
        this._updated_at = undefined;
        this._user_id = data.user_id;
    }

    get id(): string {
        return this.id;
    }
}
