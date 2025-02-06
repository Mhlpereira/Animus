import { injectable, inject } from "inversify";
import { UserService } from "./user-service";
import { Router } from "express";

@injectable()
export class UserController{
    public registerUserCustomerRoutes = Router();

    constructor(
        @inject(UserService) private userService: UserService) {
            this.initializeRoutes();
        }

        private initializeRoutes() {
            this.registerUserCustomerRoutes.get('/',)
        }
    
}


