import { inject, injectable } from "inversify";
import { CustomerCreateDTO } from "./DTO/create-customer-DTO";
import { ICustomerModel } from "./customer-interface";
import { requestBody } from "inversify-express-utils";
import { CustomerModel } from "./customer-model";


@injectable()
export class CustomerService{


    constructor(@inject('ICustomerModel') private customerModel: ICustomerModel){}


    async createCustomer(@requestBody() data: CustomerCreateDTO): Promise<{customer: CustomerModel}>{
        console.log("Entrou no createCustomer")
        const {customer} = await this.customerModel.createCustomer({
            name: data.name,
            birthday: data.birthday,
            userId: data.userId,
        });
        console.log('dentro do customer service',customer);
        return {customer};
    }
}