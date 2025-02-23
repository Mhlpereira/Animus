import { UpdateGroupDTO } from "./DTO/update-group-DTO";
import { GroupModel } from "./group-model";


export interface IGroupRepository {
    createGroup(data:{name: string, userId: string, description?: string}): Promise<{group: GroupModel}>;
    deleteGroup(groupId: string): Promise<boolean>;
    getOwnerId(groupId: string): Promise<string>;
    updateGroup(data: UpdateGroupDTO, userId: string): Promise<boolean>;
}

export interface IGroupService{
    createGroup(data:{name: string, userId: string, description?: string}): Promise<boolean>;
    deleteGroup(groupId: string, userId: string): Promise<boolean>;
    updateGroup(data: UpdateGroupDTO, userId: string): Promise<boolean>;
    getOwnerId(groupId: string): Promise<string>;
}