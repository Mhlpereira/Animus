import { CustomerModel } from "./customer-model";

export interface ICustomerData{
    id?: string;
    name?: string;
    nickname?: string;
    birthday?: Date;
    created_at?: Date;
    updated_at?: Date;
    user_id?: string;
}

export interface ICustomerRepository{
    createCustomer(data :{name: string, nickname?: string, birthday: Date, userId: string}): Promise<{customer: CustomerModel}>,
    getCustomerId(userId: string): Promise<string>
}

export interface ICustomerService{
    createCustomer(data: {name: string, nickname?: string,  birthday: Date, userId: string}): Promise<{customer: CustomerModel}>
}