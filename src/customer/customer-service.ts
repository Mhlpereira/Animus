import { CustomerModel } from "./customer-model";
import { CustomerCreateDTO } from "./DTO/create-customer-DTO";


export class CustomerService{


    constructor(){}


    async createCustomer(data: CustomerCreateDTO){

        const {customer} = await CustomerModel.createCustomer(CustomerCreateDTO)

    }
}