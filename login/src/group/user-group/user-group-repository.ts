import { inject, injectable } from 'inversify'
import { IDatabase } from '../../shared/interface/database-interface'
import { Permission } from '../../shared/enums/permission'
import { LevelType } from '../../shared/enums/levels'

@injectable()
export class UserGroupRepository {
    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async addUser(userId: string, groupId: string, levelType: LevelType): Promise<boolean> {
        const db = await this.pg.getConnection();

        const added = db.query('INSERT INTO user_group (user_id, group_id, level_type) VALUES ($1, $2, $3)', [
            userId,
            groupId,
            levelType,
        ]
        )

        return added;
    }

    async removeUser(userId: string, groupId: string): Promise<boolean>{
        const db = await this.pg.getConnection();

        const removed =  db.query('DELETE FROM user_group WHERE user_id = $1 AND group_id = $2', [
            userId,
            groupId,
        ]
        )

        return removed;
    }


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
