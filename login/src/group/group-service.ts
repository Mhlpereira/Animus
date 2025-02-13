import { CreateLevelGroupDTO } from './DTO/create-level-group-DTO';
import { inject, injectable } from "inversify";
import { IGroupModel } from "./group-interface";

@injectable()
export class GroupService{

    constructor(@inject('IGroupModel') private groupModel: IGroupModel,
){}

    async createGroup(data:{ name: string, userId: string, description?: string }){

        const {group} = await this.groupModel.createGroup(data);


        
        return {
            group
        }
    }

}