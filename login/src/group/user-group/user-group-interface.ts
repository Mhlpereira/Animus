import { LevelType } from "../../shared/enums/levels";
import { Permission } from "../../shared/enums/permission";

export interface IUserGroupData{
    userId?: string;
    groupId?: string;
    levelType?: LevelType;
}

export interface IUserGroup{
    updateLevel(newLevelType: LevelType): void;
    get level(): LevelType;
}

export interface IUserGroupRepository{
    addUser(userId: string, groupId: string, levelType: LevelType): Promise<boolean>;
    removeUser(userId: string, groupId: string): Promise<boolean>;
    getUserLevel(userId: string, groupId: string): Promise<LevelType|null>;
}