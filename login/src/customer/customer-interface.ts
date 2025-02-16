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

export interface ICustomerModel{
    createCustomer(data :{name: string, birthday: Date, userId: string}): Promise<{customer: CustomerModel}>
}

export interface ICustomerService{
    createCustomer(data: {name: string, birthday: Date, userId: string}): Promise<{customer: CustomerModel}>
}