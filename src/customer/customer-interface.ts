import { CustomerModel } from "./customer-model";

export interface ICustomerModel{
    createCustomer(data :{ name: string, birthday: Date, userId: string}): Promise<{customer: CustomerModel}>
}

export interface ICustomerService{

}