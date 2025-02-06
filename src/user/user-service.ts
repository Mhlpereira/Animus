import { UserModel } from "./user-model";

export class UserService {

    private userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async getUserById(id: string) {
        return this.userModel.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return this.userModel.getUserByEmail(email);
    }


}