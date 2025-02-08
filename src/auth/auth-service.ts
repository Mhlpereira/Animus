import { inject } from "inversify";
import { UserModel } from "../user/user-model";
import { IUserService } from "../user/user-interface";
import { CustomerModel } from "../customer/customer-model";
import { RegisterDTO } from "../user/DTO/registerUserDTO";


export class LoginService{

    constructor(@inject('IUserService') private userService: IUserService<UserModel, CustomerModel>) {
    }

    async registerUserWithCustomer(req, res) {
        try {
            const registerDTO = req.body as RegisterDTO;
            console.log("Controller antes de chamar", registerDTO);
            if (registerDTO.password !== registerDTO.confirmPassword) {
                res.status(400).json({ message: "Passwords do not match" });
                return;
            }

            const result = await this.userService.createUserWithCustomer(registerDTO);
            res.status(201).json(result);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    };

    async login(data: {email: string, password: string}) {
        const userModel = await UserModel.getUserByEmail(data.email);
}