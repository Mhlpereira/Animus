import { UserModel } from "../user/user-model";


export class LoginService{

    async login(data: {email: string, password: string}) {
        const userModel = await UserModel.getUserByEmail(data.email);
}