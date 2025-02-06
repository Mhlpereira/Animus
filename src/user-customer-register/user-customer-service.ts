import { CustomerModel } from './../customer/customer-model';
import { UserModel } from './../user/user-model';
import bcrypt from 'bcrypt';
import { RegisterDTO } from './DTO/registerDTO';
import { IUserModel } from '../user/user-interface';


export class UserCustomerService {


    constructor(private userModel: IUserModel) {}


    async createUserWithCustomer(data: RegisterDTO): Promise<{ user: UserModel, customer: CustomerModel }> {

        const hashedPassword = await this.hashPassword(data.password);
        const confirmedPassword = await this.comparePassword(data.password, hashedPassword);

        if(!confirmedPassword){
            throw new Error("Encrypted password does not match");
        }

        const { user, customer } = await this.userModel.createUserWithCustomer({
            email: data.email,
            password: hashedPassword,
            confirmPassword: data.confirmPassword,
            name: data.name,
            birthday: data.birthday
        });

        return { user, customer };
    }


    async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }
}