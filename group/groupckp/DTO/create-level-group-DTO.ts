import { Permission } from "../../shared/enums/permission";


export class CreateLevelGroupDTO{
    user_id: string;
    name: string;
    permission: Permission[];
}