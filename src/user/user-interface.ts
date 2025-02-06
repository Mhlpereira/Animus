import { CustomerModel } from '../customer/customer-model';
import { UserModel } from "./user-model";
import { RegisterDTO } from "../user-customer-register/DTO/registerDTO";

export interface IUserModel{
    createUserWithCustomer(data: RegisterDTO): Promise<{ user: UserModel, customer: CustomerModel }>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
}