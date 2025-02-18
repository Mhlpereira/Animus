import { inject, injectable } from 'inversify'
import { IUserRepository, IUserService } from './user-interface'
import bcrypt from 'bcrypt'
import { UserModel } from './user-model'
import { UserCreateDTO } from './DTO/user-create-DTO'
import { ChangeUserPasswordDTO } from './DTO/change-password-DTO'
import { UserLoginDTO } from './DTO/user-login-DTO'

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository,
    ) {}

    async createUser(data: UserCreateDTO): Promise<{ user: UserModel }> {
        console.log('entrou no user service')
        const hashedPassword = await this.hashPassword(data.password)
        const confirmedPassword = await this.comparePassword(
            data.password,
            hashedPassword,
        )

        if (!confirmedPassword) {
            throw new Error('Encrypted password failed')
        }
        const { user } = await this.userRepository.createUser({
            email: data.email,
            password: hashedPassword,
        })
        console.log('Service depois de criar', user)
        return { user }
    }

    async getUserId(id: string): Promise<string | null> {
        const userId = await this.getUserId(id)

        return userId
    }

    async getUserByEmail(email:string): Promise<UserLoginDTO|null>{
        const userData = await this.userRepository.getUserByEmail(email);

        if(!userData){
            return null
        }

        if(userData.is_active === false){
            throw new Error('User is not active');
        }


        const userLogin : UserLoginDTO = { id: userData.id, email: userData.email}
        return userLogin;
    }

    async confirmPassword(id: string, password: string): Promise<boolean> {
        const hashedPassword = await this.hashPassword(password)
        const comparePassword = await this.comparePassword(
            password,
            hashedPassword,
        )
        if (!comparePassword) {
            throw new Error('Encrypt password failed')
        }

        const storedPassword = await this.userRepository.getUserPassword(id)

        const isPasswordCorrect = await bcrypt.compare(password, storedPassword)

        return isPasswordCorrect
    }

    async changePassword(data: {
        id: string
        oldPassword: string
        password: string
    }): Promise<boolean> {
        const isConfirmed = await this.confirmPassword(
            data.id,
            data.oldPassword,
        )
        if (!isConfirmed) {
            throw new Error('Password is incorrect')
        }

        const hashedPassword = await this.hashPassword(data.password)
        const comparePassword = await this.comparePassword(
            data.password,
            hashedPassword,
        )
        if (!comparePassword) {
            throw new Error('Encrypt password failed')
        }

        return await this.userRepository.changePassword({
            id: data.id,
            password: hashedPassword,
        })
    }

    async changeEmail(data: {
        id: string
        password: string
        email: string
    }): Promise<boolean> {
        const isConfirmed = await this.confirmPassword(data.id, data.password)
        if (!isConfirmed) {
            throw new Error('Password is incorrect')
        }
        return await this.userRepository.changeEmail({
            id: data.id,
            email: data.email,
        })
    }

    async softDeleteUser(data: { id: string; password: string }): Promise<boolean> {
        const isConfirmed = await this.confirmPassword(data.id, data.password)
        if (!isConfirmed) {
            throw new Error('Password is incorrect')
        }
        return await this.userRepository.softDeleteUser({
            id: data.id
        })
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 10)
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash)
    }
}
