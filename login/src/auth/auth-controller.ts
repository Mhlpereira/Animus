import { CustomerOutputDTO } from '../user/DTO/output-customer-DTO'
import {
    controller,
    httpGet,
    httpPost,
    request,
    requestBody,
    response,
} from 'inversify-express-utils'
import { RegisterDTO } from '../user/DTO/register-DTO'
import { inject } from 'inversify'
import { IUserService } from '../user/user-interface'
import { UserCreateDTO } from '../user/DTO/user-create-DTO'
import { CustomerCreateDTO } from '../user/DTO/create-customer-DTO'
import { RegisterOutputDTO } from '../user/DTO/register-output-DTO'
import { Request, Response } from 'express'
import { UserOutputDTO } from '../user/DTO/output-user-DTO'
import { LoginDTO } from './DTO/login-DTO'
import { IAuthService } from './auth-interface'

@controller('/')
export class AuthController {
    constructor(
        @inject('IUserService') private userService: IUserService,
        @inject('IAuthService') private authService: IAuthService,
    ) {}

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
        try{
            const user = await this.userService.getUserByEmail(body.email)
            
        }
    }
}
