import { inject, injectable } from "inversify";
import { IGroupModel } from "./group-interface";

@injectable()
export class GroupService{

    constructor(@inject('IGroupModel') private groupModel: IGroupModel){}

    async createGroup(data:{ name: string, owner_id: string, description?: string }){
        return this.groupModel.createGroup(data);
    }

    
}