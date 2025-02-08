import { inject, injectable } from "inversify";
import { IUserModel, IUserService } from "./user-interface";
import bcrypt from "bcrypt";
import { UserModel } from "./user-model";
import { UserCreateDTO } from "./DTO/user-create-DTO";

@injectable()
export class UserService  implements IUserService{


    constructor(@inject('IUserModel') private userModel: IUserModel) {}    

    async getUserById(id: string) {
        return this.userModel.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return this.userModel.getUserByEmail(email);
    }

    async createUser(data: UserCreateDTO): Promise<{ user: UserModel}> {

        const hashedPassword = await this.hashPassword(data.password);
        const confirmedPassword = await this.comparePassword(data.password, hashedPassword);

        if(!confirmedPassword){
            throw new Error("Encrypted password does not match");
        }
        console.log("Service antes de criar",data );
        const { user } = await this.userModel.createUser({
            email: data.email,
            password: hashedPassword,
        });
        console.log("Service depois de criar", user);
        return { user };
    }


    async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }

}