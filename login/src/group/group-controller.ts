import {
    controller,
    httpPost,
    requestBody,
    request,
    response,
} from 'inversify-express-utils'
import { IGroupService } from './group-interface'
import { CreateGroupDTO } from './DTO/create-group-DTO'
import { Response, Request } from 'express'
import { container } from '../shared/container/container'
import { inject } from 'inversify'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { UpdateGroupDTO } from './DTO/update-group-DTO'

@controller('/group')
export class GroupController {
    constructor(@inject('IGroupService') private groupService: IGroupService) {}

    @httpPost('/create')
    async createGroup(
        @requestBody() body: CreateGroupDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        try {
            const payloadId = req.user?.id

            if (!payloadId) {
                return res.status(401).json({
                    message: 'Unauthorized',
                })
            }

            const createGroupDTO: CreateGroupDTO = {
                name: body.name,
                userId: payloadId,
                description: body.description,
            }
            const created = await this.groupService.createGroup(createGroupDTO)

            return res.status(201).json({ message: 'group created!' })
        } catch (e) {
            console.error('Error creating group:', e)
            return res.status(400).json({
                message: 'Error creating group',
            })
        }
    }

    @httpPut('/update', container.get(AuthMiddleware).handler())
    async updateGroup(
        @requestBody() body: UpdateGroupDTO,
        @response() res: Response,
        @request() req: Request,
    ) {
        const payloadId = req.user?.id

        if (!payloadId) {
            return res.status(401).json({
                message: 'Token invalid, please login again',
            })
        }

        await this.groupService.updateGroup(payloadId, body)

        return res.status(200)
    }
}
