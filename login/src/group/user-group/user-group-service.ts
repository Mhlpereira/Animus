import { injectable } from "inversify";
import { LevelType } from "../../shared/enums/levels";
import { Permission } from "../../shared/enums/permission";

@injectable()
export class UserGroupService{

    
    private getPermissionsForLevel(levelType: LevelType): Permission[] {
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

    private updateLevel(newLevelType: LevelType): void {
        this.levelType = newLevelType;
    }
}