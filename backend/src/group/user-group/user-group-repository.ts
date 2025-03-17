import { inject, injectable } from 'inversify'
import { IDatabase } from '../../shared/interface/database-interface'
import { Permission } from '../../shared/enums/permission'
import { LevelType } from '../../shared/enums/levels'
import { IUserGroupRepository } from './user-group-interface';

@injectable()
export class UserGroupRepository implements IUserGroupRepository{
    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async addUser(userId: string, groupId: string, levelType: LevelType): Promise<boolean> {
        const db = await this.pg.getConnection();

        const added = await db.query('INSERT INTO user_group (user_id, group_id, level_type) VALUES ($1, $2, $3)', [
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

    async getUserLevel(userId: string, groupId: string): Promise<LevelType|null>{
        const db = await this.pg.getConnection();

        const result = await db.query('SELECT level_type FROM user_group WHERE user_id = $1 AND group_id = $2', [
            userId,
            groupId,
        ]
        )
        if(result.rows.length === 0){
            return null;
        }
        const levelType = result.rows[0].level_type;
        return levelType;
    }

    async updateLevel(newLevelType: LevelType, userId: string, groupId: string): Promise<boolean> {
        const db = await this.pg.getConnection();

        const result = await db.query('UPDATE user_group SET level_type = $1 WHERE user_id = $2 AND group_id = $3',
            [
                newLevelType,
                userId,
                groupId,
            ]
        );

        if(result.rows.length === 0){
            return false
        }

        return true
    }
}
