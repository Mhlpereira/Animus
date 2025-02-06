import { inject, injectable } from "inversify";
import { IUserModel, IUserService } from "./user-interface";

@injectable()
export class UserService implements IUserService {


    constructor(@inject('IUserModel') private userModel: IUserModel) {}    

    async getUserById(id: string) {
        return this.userModel.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return this.userModel.getUserByEmail(email);
    }


}