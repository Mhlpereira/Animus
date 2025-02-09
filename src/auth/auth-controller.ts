import { controller, httpPost, requestBody, response } from "inversify-express-utils";
import { RegisterDTO } from "./DTO/register-DTO";
import { inject } from "inversify";
import { IUserService } from "../user/user-interface";
import * as express from 'express';
import { UserCreateDTO } from "../user/DTO/user-create-DTO";
import { CustomerCreateDTO } from "../customer/DTO/create-customer-DTO";
import { ICustomerService } from "../customer/customer-interface";
import { RegisterOutputDTO } from "./DTO/register-output-DTO";


@controller('/')
export class AuthController {


    constructor(
        @inject('IUserService') private userService: IUserService,
        @inject('ICustomerService') private customerService: ICustomerService
    ) { }

    @httpPost('/register')
    async register(@requestBody() body: RegisterDTO, @response() res: express.Response) {
        if (body.password !== body.confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        const userCreateDto: UserCreateDTO = {
            email: body.email,
            password: body.password
        }


        const { user } = await this.userService.createUser(userCreateDto);

        const customerCreateDTO: CustomerCreateDTO = {
            name: body.name,
            birthday: body.birthday,
            userId: user.id
        }
        const { customer } = await this.customerService.createCustomer(customerCreateDTO)

        const registerOutput = new RegisterOutputDTO();
        registerOutput.user = user;
        registerOutput.customer = customer;

        return res.status(201).json(registerOutput);
    }

}