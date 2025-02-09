import { inject, injectable } from "inversify";
import { CustomerCreateDTO } from "./DTO/create-customer-DTO";
import { ICustomerModel } from "./customer-interface";
import { requestBody } from "inversify-express-utils";
import { stringToBytes } from "uuid/dist/cjs/v35";

@injectable()
export class CustomerService{


    constructor(@inject('ICustomerModel') private customerModel: ICustomerModel){}


    async createCustomer(@requestBody() data: CustomerCreateDTO){

        const {customer} = await this.customerModel.createCustomer({
            name: data.name,
            birthday: data.birthday,
            userId: data.userId,
        });

        return customer;
    }
}