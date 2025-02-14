import { LevelType } from "../../shared/enums/levels";
import { Permission } from "../../shared/enums/permission";
import { IUserGroup } from "./user-group-interface";

export class UserGroup implements IUserGroup {
  constructor(
    public userId: string,
    public groupId: string,
    private levelType: LevelType
  ) {}

  private updateLevel(newLevelType: LevelType): void {
    this.levelType = newLevelType;
  }

  get level(): LevelType {
    return this.levelType;
  }

}