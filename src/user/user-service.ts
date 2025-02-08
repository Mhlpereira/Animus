import { inject, injectable } from "inversify";
import { IUserModel, IUserService } from "./user-interface";
import { RegisterDTO } from "./DTO/registerUserDTO";
import bcrypt from "bcrypt";

@injectable()
export class UserService<TUserModel, TCustomerModel>  implements IUserService<TUserModel, TCustomerModel>{


    constructor(@inject('IUserModel') private userModel: IUserModel) {}    

    async getUserById(id: string) {
        return this.userModel.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return this.userModel.getUserByEmail(email);
    }

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