import { inject } from "inversify";
import { Router } from "express";
import { httpGet, BaseHttpController, interfaces, controller, httpPost } from "inversify-express-utils";
import { RegisterDTO } from "./DTO/registerUserDTO";
import { IUserService } from "./user-interface";


@controller('/user')
export class UserController<TUser, TCustomer>  {
    public registerUserCustomerRoutes = Router();

    constructor(
        @inject('IUserCustomerService')
        private userService: IUserService<TUser, TCustomer>) {
    }


    @httpPost('/')
    private async registerUserWithCustomer(req, res) {
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
}


