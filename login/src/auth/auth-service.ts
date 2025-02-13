import { inject } from "inversify";
import { IUserService } from "../user/user-interface";


export class LoginService{

    constructor(@inject('IUserService') private userService: IUserService) {
    }


    async login(data: {email: string, password: string}) {
        const email = await this.userService.getUserByEmail(data.email);
}