import { CustomerOutputDTO } from './../customer/DTO/output-customer-DTO';
import { controller, httpGet, httpPost, requestBody, response } from "inversify-express-utils";
import { RegisterDTO } from "./DTO/register-DTO";
import { inject } from "inversify";
import { IUserService } from "../user/user-interface";
import { UserCreateDTO } from "../user/DTO/user-create-DTO";
import { CustomerCreateDTO } from "../customer/DTO/create-customer-DTO";
import { ICustomerService } from "../customer/customer-interface";
import { RegisterOutputDTO } from "./DTO/register-output-DTO";
import { Response } from "express";
import { UserOutputDTO } from "../user/DTO/output-user-DTO";


@controller('/')
export class AuthController {


    constructor(
        @inject('IUserService') private userService: IUserService,
        @inject('ICustomerService') private customerService: ICustomerService
    ) { }

    @httpGet('/')
    async teste() {
        return "Hello World"
    }

    @httpPost('/')
    async register(@requestBody() body: RegisterDTO, @response() res: Response) {
        try {
            if (body.password !== body.confirmPassword) {
                res.status(400).json({ message: "Passwords do not match" });
                return;
            }

            const userCreateDto: UserCreateDTO = {
                email: body.email,
                password: body.password
            }

            const { user } = await this.userService.createUser(userCreateDto);

            const userOutPutDTO = new UserOutputDTO();


            const customerCreateDTO: CustomerCreateDTO = {
                name: body.name,
                birthday: body.birthday,
                userId: user.id
            }

            const { customer } = await this.customerService.createCustomer(customerCreateDTO);

            const customerOutputDTO = new CustomerOutputDTO();

            const registerOutput = new RegisterOutputDTO();
            userOutPutDTO.email = user.email;
            registerOutput.user = userOutPutDTO;
            customerOutputDTO.name = customer.name;
            customerOutputDTO.birthday = customer.birthday;
            registerOutput.customer = customerOutputDTO;

            return res.status(201).json(registerOutput);
        } catch (e) {
            console.error("Error creating user:", e);
            return res.status(500).json({
                message: 'Error creating user'
            });
        }
    }

}