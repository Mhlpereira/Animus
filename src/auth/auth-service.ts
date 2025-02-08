import { inject } from "inversify";
import { UserModel } from "../user/user-model";
import { IUserService } from "../user/user-interface";
import { CustomerModel } from "../customer/customer-model";
import { RegisterDTO } from "./DTO/register-DTO";
import { CustomerCreateDTO } from "../customer/DTO/create-customer-DTO";


export class LoginService{

    constructor(@inject('IUserService') private userService: IUserService) {
    }


    async login(data: {email: string, password: string}) {
        const userModel = await UserModel.getUserByEmail(data.email);
}