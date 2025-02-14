import { IUserData } from "./user-interface";

export class UserModel {
    private _id: string;
    private _email: string;
    private _password: string;
    private _created_at: Date;


    constructor(data: IUserData = {}) {
        this.fill(data);
    }

    fill(data: IUserData): void {
        if (data.id !== undefined) this._id = data.id ?? this._id;
        this._email = data.email;
        this._password = data.password;
        if (data.created_at !== undefined) this._created_at = data.created_at ?? this._created_at;
    }

    get id(): String{
        return this._id;
    }

    get email(): String{
        return this._email;
    }

    get password(): String{
        return this._password;
    }


    get created_at(): Date {
        return this._created_at;
    }
}