import { inject } from 'inversify'
import { IUserService } from '../user/user-interface'
import jwt from 'jsonwebtoken'
import { IAuthRepository, IAuthService } from './auth-interface'

export class AuthService implements IAuthService{
    private readonly JWT_SECRET = process.env.JWT_SECRET
    private readonly REFRESH_SECRET = process.env.REFRESH_SECRET

    constructor(@inject('IUserService') private userService: IUserService,
                @inject('IAuthRepository') private authRepository: IAuthRepository) {}

    async login(data: { email: string; password: string }) {
        const user = await this.userService.getUserByEmail(data.email);

        const confirmed = await this.userService.confirmPassword(user.id, data.password);

        if(!user || !confirmed){
            throw new Error('Email or password is incorrect');
        }


        const tokens = await this.generateTokens(user.id, user.email);

        await this.authRepository.saveRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }


    private async generateTokens(userId: string, userName:string, userNickname: string | null, userEmail: string){


        const payload = {
            userId: userId,
            name: userName,
            nickname: userNickname ?? null,
            email: userEmail
        }

        const accessToken = jwt.sign(
            payload,
            this.JWT_SECRET,
            { expires_in: '15m'}
        );

        const refreshToken = jwt.sign(
            payload,
            this.REFRESH_SECRET,
            { expires_in: '15m'}
        );

        return {accessToken, refreshToken};
    }

    async logout(userId: string): Promise<void> {
        await this.authRepository.removeRefreshToken(userId);
    }
}
