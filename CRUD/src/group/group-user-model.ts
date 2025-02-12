import { UserLevel } from "../shared/enums/user-level";


export class GroupUserModel{

    group_id: string;
    user_id: string;
    level: UserLevel

    constructor(data: Partial<GroupUserModel> = {}) {
        this.fill(data);
    }

    



    fill(data: Partial<GroupUserModel>) {
        this.group_id = data.group_id
        this.user_id = data.user_id
        if (this.user_id !== undefined) this.level = data.level
    }
}