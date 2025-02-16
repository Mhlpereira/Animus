import { IUserData } from "./user-interface";

export class UserModel {
    private _id: string;
    private _email: string;
    private _password: string;
    private _is_active: boolean;
    private _created_at: Date;
    private _updated_at?: Date;
    private _password_updated_at?: Date;


    constructor(data: IUserData = {}) {
        this.fill(data);
    }

    fill(data: IUserData): void {
        this._id = data.id;
        this._email = data.email;
        this._password = data.password;
        this._is_active = data.is_active ?? true;
        this._created_at = data.created_at ;
        this._updated_at =  undefined;
        this._password_updated_at = undefined;
    }

    get id(): string{
        return this._id;
    }

    get email(): string{
        return this._email;
    }

    get password(): string{
        return this._password;
    }

    get is_active(): boolean {
        return this._is_active;
    }


    get created_at(): Date {
        return this._created_at;
    }

    get updated_at(): Date{
        return this._updated_at;
    }

    get password_updated_at(): Date{
        return this._password_updated_at;
    }

    set email(value: string){
        this._email = value;
        
    }

    set password(value: string){
        this._password = value;
    }

    set is_active(value: boolean) {
        this._is_active;
    }

    set updated_at(value: Date){
        this._updated_at;
    }
    

    set password_updated_at(value: Date){
        this._password_updated_at;
    }
}