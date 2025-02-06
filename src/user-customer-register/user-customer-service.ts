import bcrypt from 'bcrypt';
import { RegisterDTO } from './DTO/registerDTO';
import { IUserModel } from '../user/user-interface';
import { injectable , inject } from 'inversify';
import { IUserCustomerService } from './user-customer-interface';


@injectable()
export class UserCustomerService<TUserModel, TCustomerModel> implements IUserCustomerService<TUserModel, TCustomerModel> {


    constructor(@inject('IUserModel') private userModel: IUserModel ) {}


    async createUserWithCustomer(data: RegisterDTO): Promise<{ user: TUserModel, customer: TCustomerModel }> {

        const hashedPassword = await this.hashPassword(data.password);
        const confirmedPassword = await this.comparePassword(data.password, hashedPassword);

        if(!confirmedPassword){
            throw new Error("Encrypted password does not match");
        }
        console.log("Service antes de criar",data );
        const { user, customer } = await this.userModel.createUserWithCustomer({
            email: data.email,
            password: hashedPassword,
            confirmPassword: data.confirmPassword,
            name: data.name,
            birthday: data.birthday
        });
        console.log("Service depois de criar", user, customer);
        return { user: user as TUserModel, customer: customer as TCustomerModel };
    }


    async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }
}