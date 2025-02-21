import { CreateLevelGroupDTO } from "./DTO/create-level-group-DTO";
import { GroupModel } from "./group-model";


export interface IGroupRepository {
    createGroup(data:{name: string, userId: string, description?: string}): Promise<{group: GroupModel}>;
    deleteGroup(groupId: string): Promise<boolean>;
    getOwnerId(groupId: string): Promise<string>;
}

export interface IGroupService{
    createGroup(data:{name: string, userId: string, description?: string}): Promise<{group: GroupModel}>;
    deleteGroup(groupId: string, userId: string): Promise<boolean>;
    getOwnerId(groupId: string): Promise<string>;
}