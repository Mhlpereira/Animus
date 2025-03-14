import {
    controller,
    httpPost,
    requestBody,
    request,
    response,
    httpPut,
    httpDelete,
    requestParam,
    httpGet,
} from 'inversify-express-utils'
import { IGroupService } from './group-interface'
import { CreateGroupDTO } from './DTO/create-group-DTO'
import { Response, Request } from 'express'
import { container } from '../shared/container/container'
import { inject } from 'inversify'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { UpdateGroupDTO } from './DTO/update-group-DTO'
import { PermissionRequired } from '../shared/decorators/role-required'
import { Permission } from '../shared/enums/permission'
import { IUserGroupService } from './user-group/user-group-interface'
import { LevelType } from '../shared/enums/levels'
import { OutputGroupDTO } from './DTO/output-group-DTO'

@controller('/group')
export class GroupController {
    constructor(
        @inject('IGroupService') private groupService: IGroupService,
        @inject('IUserGroupService')
        private userGroupService: IUserGroupService,
    ) {}

    @httpPost('/create', container.get(AuthMiddleware).handler())
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
            const groupOutput = new OutputGroupDTO()
            groupOutput.name = created.name

            return res.status(201).json({ message: 'group created!' })
        } catch (e) {
            console.error('Error creating group:', e)
            return res.status(400).json({
                message: 'Error creating group',
            })
        }
    }

    @httpPut('/update', container.get(AuthMiddleware).handler())
    @PermissionRequired(Permission.MANAGE_GROUP)
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

        await this.groupService.updateGroup(body, payloadId)

        return res.status(200)
    }

    @httpPut('/delete', container.get(AuthMiddleware).handler())
    @PermissionRequired(Permission.MANAGE_GROUP)
    async deleteGroup(
        @requestBody() body: { groupId: string },
        @response() res: Response,
        @request() req: Request,
    ) {
        const payloadId = req.user?.id

        if (!payloadId) {
            return res.status(401).json({
                message: 'Token invalid, please login again',
            })
        }

        await this.groupService.deleteGroup(body.groupId, payloadId)

        return res.status(200)
    }

    @httpPost('/addUser', container.get(AuthMiddleware).handler())
    @PermissionRequired(Permission.INVITE_MEMBERS)
    async addUser(
        @requestBody() body: { userId: string; levelType: LevelType },
        @response() res: Response,
        @request() req: Request,
        @requestParam('groupName') groupName: string,
    ) {
        const payloadId = req.user?.id

        if (!payloadId) {
            return res.status(401).json({
                message: 'Token invalid, please login again',
            })
        }

        await this.userGroupService.addUser(
            body.userId,
            groupName,
            body.levelType,
        )

        return res.status(200)
    }

    @httpGet('/:groupName', container.get(AuthMiddleware).handler())
    async getGroupByName(
        @requestParam('groupName') groupName: string,
        @response() res: Response,
    ) {
        const group = await this.groupService.getGroupByName(groupName)

        return res.status(200).json({ group })
    }
}
