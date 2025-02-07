import { injectable, inject } from "inversify";
import { Router } from "express";
import { RegisterDTO } from "./DTO/registerDTO";
import { IUserService } from "./user-interface";


@injectable()
export class UserController<TUser, TCustomer>  {
    public registerUserCustomerRoutes = Router();

    constructor(
        @inject('IUserCustomerService')
        private userService: IUserService<TUser, TCustomer>) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.registerUserCustomerRoutes.post('/', this.registerUserWithCustomer)
    }


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


