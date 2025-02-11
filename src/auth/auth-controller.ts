import { controller, httpGet, httpPost, requestBody, response } from "inversify-express-utils";
import { RegisterDTO } from "./DTO/register-DTO";
import { inject } from "inversify";
import { IUserService } from "../user/user-interface";
import { UserCreateDTO } from "../user/DTO/user-create-DTO";
import { CustomerCreateDTO } from "../customer/DTO/create-customer-DTO";
import { ICustomerService } from "../customer/customer-interface";
import { RegisterOutputDTO } from "./DTO/register-output-DTO";
import { Response } from "express";


@controller('/')
export class AuthController {


    constructor(
        @inject('IUserService') private userService: IUserService,
        @inject('ICustomerService') private customerService: ICustomerService
    ) { }

    @httpGet('/')
    async teste(){
        return "Hello World"
    }

    @httpPost('/')
    async register(@requestBody() body: RegisterDTO, @response() res: Response) {
        console.log("entrou no register!")
        if (body.password !== body.confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        const userCreateDto: UserCreateDTO = {
            email: body.email,
            password: body.password
        }

        console.log('antes de criar o usuário',userCreateDto)
        const { user } = await this.userService.createUser(userCreateDto);

        const customerCreateDTO: CustomerCreateDTO = {
            name: body.name,
            birthday: body.birthday,
            userId: user.id
        }

        console.log('Depois de criar o usuário',customerCreateDTO)
        const { customer } = await this.customerService.createCustomer(customerCreateDTO)
        console.log('Depois de criar o cliente', customer);
        const registerOutput = new RegisterOutputDTO();
        registerOutput.user = user;
        registerOutput.customer = customer;
        console.log('Depois de criar o cliente',registerOutput);
        return res.status(201).json(registerOutput);
    }

}