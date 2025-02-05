import bcrypt from 'bcrypt';
import { RegisterDTO } from './DTO/registerDTO';
import { UserModel } from '../user/user-model';

export class UserCustomerService {


    async registerUser(data: RegisterDTO) {

        const hashedPassword = await this.hashPassword(data.password);
        const confirmedPassword = await this.comparePassword(data.password, hashedPassword);

        if(!confirmedPassword){
            throw new Error("Encrypted password does not match");
        }

        return await UserModel.createWithCustomer({
            email: data.email,
            hashedPassword: hashedPassword,
            name: data.name,
            birthday: data.birthday
        });


    }


    async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }
}