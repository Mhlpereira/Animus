import { inject } from "inversify";
import { Router } from "express";
import { httpGet, BaseHttpController, interfaces, controller, httpPost } from "inversify-express-utils";
import { RegisterDTO } from "../auth/DTO/register-DTO";
import { IUserService } from "./user-interface";


@controller('/user')
export class UserController<TUser, TCustomer>  {
    public registerUserCustomerRoutes = Router();

    constructor(
        @inject('IUserCustomerService')
        private userService: IUserService) {
    }


   
}


