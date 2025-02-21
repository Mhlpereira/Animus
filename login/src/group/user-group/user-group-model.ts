import { LevelType } from "../../shared/enums/levels";
import { IUserGroupData } from "./user-group-interface";

export class UserGroupModel {

  private _userId: string;
  private _groupId: string;
  private _levelType: LevelType;

  constructor(data: IUserGroupData = {}) {
    this._userId = data.userId;
    this._groupId = data.groupId;
    this._levelType = data.levelType;
  }

  get userId(): string {
    return this._userId;
  }

  get groupId(): string {
    return this._groupId;
  }

  get levelType(): LevelType {
    return this._levelType;
  }

  set levelType(value: LevelType) {
    this._levelType = value;
  } 

}