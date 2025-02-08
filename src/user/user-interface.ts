import { CustomerModel } from '../customer/customer-model';
import { UserModel } from "./user-model";
import { RegisterDTO } from "./DTO/registerUserDTO";

export interface IUserModel{
    createUserWithCustomer(data: RegisterDTO): Promise<{user: UserModel,customer: CustomerModel }>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
}

export interface IUserService<TUserModel, TCustomerModel>{
    createUserWithCustomer(data: RegisterDTO): Promise<{user: TUserModel, customer: TCustomerModel }>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}