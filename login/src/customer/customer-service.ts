import { inject, injectable } from "inversify";
import { CustomerCreateDTO } from "./DTO/create-customer-DTO";
import { ICustomerModel } from "./customer-interface";
import { requestBody } from "inversify-express-utils";
import { CustomerModel } from "./customer-model";


@injectable()
export class CustomerService{


    constructor(@inject('ICustomerModel') private customerModel: ICustomerModel){}


    async createCustomer(@requestBody() data: CustomerCreateDTO): Promise<{customer: CustomerModel}>{

        const {customer} = await this.customerModel.createCustomer({
            name: data.name,
            nickname: data.nickName,
            birthday: data.birthday,
            userId: data.userId,
        });

        return {customer};
    }

    async changeName(){}

    async changeNickname
}