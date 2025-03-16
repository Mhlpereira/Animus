import {
    controller,
    httpGet,
    httpPost,
    request,
    requestBody,
    response,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { Request, Response } from 'express'
import { LoginDTO } from './DTO/login-DTO'
import { IAuthService } from './auth-interface'

@controller('/')
export class AuthController {
    constructor(@inject('IAuthService') private authService: IAuthService) {}

    @httpGet('/')
    async teste() {
        return 'Hello World'
    }

    @httpPost('/login')
    async login(
        @requestBody() body: LoginDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        try {
            const tokens = await this.authService.login(body)

            return res.status(200).json({
                success: true,
                data: tokens,
            })
        } catch (e) {
            return res.status(400).json({ success: false, message: e.message })
        }
    }

    @httpPost('/logout')
    async logout(@request() req: Request, @response() res: Response) {
        try {
            const userId = req.user.id 
            await this.authService.logout(userId)

            return res.status(200).json({
                success: true,
                message: 'Logged out successfully',
            })
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: e.message,
            })
        }
    }
}
