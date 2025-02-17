import { inject } from 'inversify'
import {
    controller,
    httpPut,
    requestBody,
    request,
    response,
} from 'inversify-express-utils'
import { Response, Request } from 'express'
import { ICustomerService } from './customer-interface'
import { ChangeNameDTO } from './DTO/change-name-DTO'
import { ChangeNicknameDTO } from './DTO/change-nickname-DTO'

@controller('/customer')
export class CustomerController {
    constructor(
        @inject('ICustomerService') private customerService: ICustomerService,
    ) {}

    @httpPut('/changeName')
    async changeName(
        @requestBody() body: ChangeNameDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        try {
            const confirmed = await this.customerService.changeName(body)

            return res.status(200).json({ message: 'Name changed' })
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    @httpPut('/changeName')
    async changeNickname(
        @requestBody() body: ChangeNicknameDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        try {
            await this.customerService.changeNickname(body)

            return res.status(200).json({ message: 'Name changed' })
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}
