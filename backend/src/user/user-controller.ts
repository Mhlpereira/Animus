import { inject } from 'inversify'
import {
    httpGet,
    BaseHttpController,
    interfaces,
    controller,
    httpPost,
    httpPut,
    requestBody,
    response,
    request,
} from 'inversify-express-utils'
import { IUserService } from './user-interface'
import { ChangeUserPasswordDTO } from './DTO/change-password-DTO'
import { Request, Response } from 'express'
import { container } from '../shared/container/container'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { ChangeUserEmailDTO } from './DTO/change-email-DTO'
import { DeleteUserDTO } from './DTO/delete-user-DTO'
import { UpdateCustomerDTO } from './DTO/update-customer'
import { RegisterOutputDTO } from './DTO/register-output-DTO'
import { RegisterDTO } from './DTO/register-DTO'


@controller('/user')
export class UserController {
    //midleware provisório
    constructor(@inject('IUserService') private userService: IUserService) {}

        @httpPost('/')
        async createUserWithCustomer(
            @requestBody() body: RegisterDTO,
            @response() res: Response,
        ) {
            try {
                if (body.password !== body.confirmedPassword) {
                    res.status(400).json({ message: 'Passwords do not match' })
                    return
                }
    
                const userWithCustomer = await this.userService.createUserWithCustomer(body); 

                const registerOutput = new RegisterOutputDTO()
                registerOutput.email = userWithCustomer.user.email
    
                return res.status(201).json(registerOutput)
            } catch (e) {
                console.error('Error creating user:', e)
                return res.status(500).json({
                    message: 'Error creating user',
                })
            }
        }
    

    @httpPut('/changePassword', container.get(AuthMiddleware).handler())
    async changePassword(
        @requestBody() body: ChangeUserPasswordDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        try {
            if (body.password !== body.confirmedPassword) {
                res.status(400).json({ message: "Passwords doesn't match" })
                return
            }

            const id = req.user.id
            if (!id) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }

            await this.userService.changePassword({
                id,
                oldPassword: body.oldPassword,
                password: body.password,
            })
            res.status(200).json({ message: 'Password changed successfully' })
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    @httpPut('/changeEmail', container.get(AuthMiddleware).handler())
    async changeEmail(
        @requestBody() body: ChangeUserEmailDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        try {
            if (body.newEmail !== body.confirmEmail) {
                res.status(400).json({ message: "Email doesn't match" })
                return
            }

            const id = req.user.id
            if (!id) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }
            await this.userService.changeEmail({
                id: id,
                password: body.password,
                email: body.newEmail,
            })
            res.status(200).json({ message: 'Email changed successfully' })
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    @httpPut('/deleteUser', container.get(AuthMiddleware).handler())
    async deleteUser(
        @requestBody() body: DeleteUserDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        const id = req.user.id
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        await this.userService.softDeleteUser({
            id: id,
            password: body.password,
        })
    }

    @httpPut('/customer/update')
    async updateCustomer(
        @requestBody() body: UpdateCustomerDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        const id = req.user.id
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        await this.userService.updateCustomer(id,body)

        return res.status(200).json({ message: 'updated!' })
    }

}
