import { CreateLevelGroupDTO } from "./DTO/create-level-group-DTO";
import { GroupModel } from "./group-model";


export interface IGroupModel {
    createGroup(data:{name: string, userId: string, description?: string}): Promise<{group: GroupModel}>;
}

export interface IGroupService{
    createGroup(data:{name: string, userId: string, description?: string}): Promise<{group: GroupModel}>;
}