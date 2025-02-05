import { UserModel } from "./user-model";

export class UserService {

    async getUserById(id: string) {
        return new UserModel({
            id: id,
        });
    }
}