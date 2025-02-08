import { controller, httpPost } from "inversify-express-utils";
import { RegisterDTO } from "../user/DTO/registerUserDTO";
import { inject } from "inversify";
import { IUserService } from "../user/user-interface";

@controller('/')
export class AuthController{
    

    constructor(
        @inject('IUserService') private userService: IUserService
        ){}

    @httpPost('/register')
    @response(201)
    async register(@requestBody() body: RegisterDTO){
        if (body.password !== body.confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const result = await this.userService.createUserWithCustomer(body);
        return result;
    }
    
}