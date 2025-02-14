import { LevelType } from "../../shared/enums/levels";
import { Permission } from "../../shared/enums/permission";

export interface IUserGroup{
    updateLevel(newLevelType: LevelType): void;
    get level(): LevelType;
}