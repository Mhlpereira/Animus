import { inject, injectable } from "inversify";
import { CustomerCreateDTO } from "./DTO/create-customer-DTO";
import { ICustomerRepository, ICustomerService } from "./customer-interface";
import { requestBody } from "inversify-express-utils";
import { CustomerModel } from "./customer-model";
import { IUserService } from "../user/user-interface";


@injectable()
export class CustomerService implements ICustomerService{


    constructor(@inject('ICustomerRepository') private customerRepository: ICustomerRepository,
                @inject('IUserService') private userService: IUserService){}


    async createCustomer(@requestBody() data: {name: string, nickname?: string, birthday: Date, userId: string}): Promise<{customer: CustomerModel}>{

        const {customer} = await this.customerRepository.createCustomer({
            name: data.name,
            nickname: data.nickname,
            birthday: data.birthday,
            userId: data.userId,
        });

        return {customer};
    }

    async changeName(@requestBody() data: {id: string, name: string}): Promise<boolean>{

        const userId = await this.userService.getUserId(data.id);
        if(!userId){
            throw new Error ('Id not found')
        }

        const customerId =  await this.customerRepository.getCustomerId(userId);
        if(!customerId){
            throw new Error ('Customer not found')
        }

        const result = this.customerRepository.changeName({ id: customerId, name: data.name });

        return result

    }

    async changeNickname(@requestBody() data: {id: string, nickname: string}): Promise<boolean>{

        const userId = await this.userService.getUserId(data.id);
        if(!userId){
            throw new Error ('Id not found')
        }

        const customerId =  await this.customerRepository.getCustomerId(userId);
        if(!customerId){
            throw new Error ('Customer not found')
        }

        const result = this.customerRepository.changeNickname({ id: customerId, nickname: data.nickname });

        return result

    }
}