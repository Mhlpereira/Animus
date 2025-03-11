import { ICustomer, ICustomerData } from "./user-interface";
import mongoose, { Schema, Document, Model } from 'mongoose';

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

    private static  schema = new Schema<ICustomer>({
        user_id: { type: String, required: true, unique: true },
        name: { type: String, unique: false }, 
        nickname: { type: String, unique: false }, 
    });

    public static model: Model<ICustomer> = mongoose.model<ICustomer>('Customer', CustomerModel.schema);
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
