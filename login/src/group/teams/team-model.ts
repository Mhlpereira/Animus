import { HorarioJson } from './../../types/horarioJson';
import { IDataTeam } from './team-interface';


export class TeamModel{
    private _id: string;
    private _name: string;
    private _shcedule?: HorarioJson[];
    private _instructorId?: string;
    private _groupId: string;

    constructor(data: IDataTeam = {}){
        this._id = data.id;
        this._name = data.name;
        this._shcedule = data.horarioJson || undefined;
        this._instructorId = data.instructorId || undefined;
        this._groupId = data.groupId;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }
    get schedule(){
        return this._shcedule;
    }
    get instructorId(){
        return this._instructorId;
    }
    get groupId(){
        return this._groupId;
    }

    set name(value: string){
        this._name = value;
    }

    set schedule(value: HorarioJson[]){
        this._shcedule = value;
    }

    set instructorId(value: string){
        this._instructorId = value;
    }
}