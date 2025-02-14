import { UserModel } from "../user/user-model";
import { Database } from "../shared/db/database";
import { v4 as uuid } from "uuid";
import { IDatabaseConnection } from "../shared/interface/database-interface";
import { injectable } from "inversify";
import { UserGroup } from "./user-group/user-group-model";
import { LevelType } from "../shared/enums/levels";
import { Permission } from "../shared/enums/permission";


@injectable()
export class GroupModel {
    private _id: string;
    private _name: string;
    private _owner_id: string;
    private _description: string;
    private _users: UserGroup[];
    private _created_at: Date;
    private _updated_at?: Date;
    private _deleted_at?: Date;

    constructor(data: Partial<GroupModel> = {}) {
        this.fill(data);
    }

    async createGroup(data: Partial<GroupModel>, options?: { connection?: IDatabaseConnection }): Promise<{ group: GroupModel }> {
        const db = options?.connection ?? await Database.getConnection();
        const created_at = new Date();
        const id = uuid();
        try {
            await db.query('BEGIN');
            const result = await db.query(
                'INSERT INTO groups (id, name, owner_id, description, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [id, data.name, data.owner_id, data.description, created_at]
            );
            const group = new GroupModel(result.rows[0]);


            await db.query('COMMIT');
            return { group };
        } catch (e) {
            await db.query('ROLLBACK');
            throw new Error(`Error creating group: ${e.message}`);
        } finally {
            if (!options?.connection) {
                db.release();
            }
        }
    }

    async getOwnerId(
        group_id: string,
        options?: { connection?: IDatabaseConnection }): Promise<string | null> {
        const db = options?.connection ?? await Database.getConnection();
        try {
            const result = await db.query("SELECT owner_id FROM groups WHERE id = $1", [group_id]);
            return result.rows.length ? result.rows[0].owner_id : null;
        } catch (e) {
            throw new Error(`Error creating group: ${e.message}`);
        } finally {
            if (!options?.connection) {
                db.release();
            }
        }
    }

    private addUser(userId: string, levelType: LevelType): void {
        const userGroup = new UserGroup(userId, this.id, levelType);
        this.userGroups.push(userGroup);
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
                Permission.JOIN_CONTENT
            ],
            [LevelType.INSTRUCTOR]: [
                Permission.CREATE_CONTENT,
                Permission.DELETE_CONTENT,
                Permission.ACCEPT_MEMBERS,
                Permission.INVITE_MEMBERS,
                Permission.JOIN_CONTENT
            ],
            [LevelType.MEMBER]: [
                Permission.JOIN_CONTENT,
            ],
            [LevelType.GUEST]: [],
            [LevelType.NONE]: []
        };

        const permissions = permissionsMapping[levelType];
        if (!permissions) {
            throw new Error('Invalid level type.');
        }
        return permissions;
    }


    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get owner_id(): string {
        return this._owner_id;
    }

    get description(): string {
        return this._description;
    }

    get users(): UserGroup[] {
        return this._users;
    }

    get created_at(): Date {
        return this._created_at;
    }

    get updated_at(): Date | undefined {
        return this._updated_at;
    }

    get deleted_at(): Date | undefined {
        return this._deleted_at;
    }

    set name(value: string) {
        if (!value) throw new Error("Name is required");
        this._name = value;
    }

    set description(value: string) {
        this._description = value;
    }

    fill(data: Partial<GroupModel>) {
        this._id = data.id ?? this._id
        this._name = data.name ?? this._name;
        this._owner_id = data.owner_id ?? this._owner_id;
        this._description = data.description ?? this._description;
        this._users = data.users ?? this._users ?? [];
        this._created_at = data.created_at ?? this._created_at ?? new Date();
        this._updated_at = data.updated_at ?? this._updated_at;
        this._deleted_at = data.deleted_at ?? this._deleted_at;
    }
}