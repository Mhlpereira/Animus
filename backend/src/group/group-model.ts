export class GroupModel {
    private _id: string;
    private _name: string;
    private _owner_id: string;
    private _description: string;
    private _created_at: Date;
    private _updated_at?: Date;


    constructor(data: Partial<GroupModel> = {}) {
        this._id = data.id;
        this._name = data.name;
        this._owner_id = data.owner_id;
        this._description = data.description || "";
        this._created_at = data.created_at || new Date();
        this._updated_at = undefined;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get owner_id(): string {
        return this._owner_id;
    }

    get description(): string {
        return this._description;
    }

    get created_at(): Date {
        return this._created_at;
    }

    get updated_at(): Date | undefined {
        return this._updated_at;
    }


    set name(value: string) {
        if (!value) throw new Error("Name is required");
        this._name = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set owner_id(value: string){
        if(!value) throw new Error("Owner is required");
        this._owner_id = value;
    }

}