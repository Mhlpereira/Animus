import { inject, injectable } from "inversify";
import { LevelType } from "../../shared/enums/levels";
import { Permission } from "../../shared/enums/permission";
import { IUserGroupRepository, IUserGroupService } from "./user-group-interface";

@injectable()
export class UserGroupService implements IUserGroupService{

    constructor(@inject('IUserGroupRepository') private userGroupRepository: IUserGroupRepository,
    ){}

    async addUser(userId: string, groupId: string, levelType: LevelType): Promise<boolean> {
        const added = await this.userGroupRepository.addUser(userId, groupId, levelType);
        return added;
    }

    async removeUser(userId: string, groupId: string): Promise<boolean>{
        const removed = await this.userGroupRepository.removeUser(userId, groupId);
        return removed;
    }

    async getUserLevel(userId: string, groupId: string): Promise<LevelType|null>{
        const levelType = await this.userGroupRepository.getUserLevel(userId, groupId);
        return levelType;
    }

    async updateLevel(newLevelType: LevelType, groupId: string, userId: string): Promise<boolean> {
        await this.userGroupRepository.updateLevel(newLevelType, userId, groupId);
        return true;
    }

    
    getPermissionsForLevel(levelType: LevelType): Permission[] {
        const permissionsMapping: Record<LevelType, Permission[]> = {
            [LevelType.OWNER]: Object.values(Permission),
            [LevelType.ADMIN]: [
                Permission.MANAGE_MEMBERS,
                Permission.PROMOTE_MEMBERS,
                Permission.DEMOTE_MEMBERS,
                Permission.CREATE_CONTENT,
                Permission.DELETE_CONTENT,
                Permission.ACCEPT_MEMBERS,
                Permission.INVITE_MEMBERS,
                Permission.REMOVE_MEMBERS,
                Permission.EDIT_CONTENT,
                Permission.JOIN_CONTENT,
            ],
            [LevelType.INSTRUCTOR]: [
                Permission.CREATE_CONTENT,
                Permission.DELETE_CONTENT,
                Permission.ACCEPT_MEMBERS,
                Permission.INVITE_MEMBERS,
                Permission.JOIN_CONTENT,
            ],
            [LevelType.MEMBER]: [Permission.JOIN_CONTENT],
            [LevelType.GUEST]: [],
            [LevelType.NONE]: [],
        }

        const permissions = permissionsMapping[levelType]
        if (!permissions) {
            throw new Error('Invalid level type.')
        }
        return permissions
    }


}