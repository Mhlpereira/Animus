import { RegisterDTO } from "./DTO/registerDTO";

export interface IUserCustomerService<TUser, TCustomer> {
    //passando tipo genérico para evitar acoplamento.
    createUserWithCustomer(data: RegisterDTO): Promise<{ user: TUser, customer: TCustomer }>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}