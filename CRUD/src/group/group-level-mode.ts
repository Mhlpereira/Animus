

export class CreateLevelGroup {
    id: string;
    group_id: string;
    user_id: string;
    name: string;
    permissions: Record<string, boolean>; 

    constructor(id: string, group_id: string, user_id: string, name: string, permission: object) {
      id = this.id;
      group_id = this.group_id;
      user_id = this.user_id;
      name = this.name;
      permission = this.permission;
    }

    hasPermission(permission: string): boolean{
        // as !! converte qualquer valor para booleano
        retun !!this.permission[permission];
    }
}