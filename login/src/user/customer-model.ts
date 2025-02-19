import { ICustomerData } from "./user-interface";

export class CustomerModel{
    private _user_id: string;
    private _name: string;
    private _nickname: string;
    private _birthday: Date;


    constructor(data: ICustomerData = {}) {
        this._user_id = data.user_id;
        this._name = data.name ;
        this._birthday = data.birthday ;
        this._user_id = data.user_id;
    }

    get user_id(): string {
        return this._user_id;
    }


    get name(): string{
        return this._name;
    }

    get birthday(): Date{
        return this._birthday;
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

    
}
