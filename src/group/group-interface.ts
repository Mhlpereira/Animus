import { GroupModel } from "./group-model";


export interface IGroupModel {
    createGroup(data:{name: string, owner_id: string, description?: string}): Promise<{group: GroupModel}>;
}

export interface IGroupService{
    createGroup(data:{name: string, owner_id: string, description?: string}): Promise<{group: GroupModel}>;
}