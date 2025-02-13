import { controller, httpPost, requestBody, request, response } from "inversify-express-utils";
import { IGroupService } from "./group-interface";
import { CreateGroupDTO } from "./DTO/create-group-DTO";
import { Response, Request } from "express";


@controller('/group')
export class GroupController {


    constructor(private groupService: IGroupService) { }

    @httpPost('/create')
    async createGroup(
        @requestBody() body: CreateGroupDTO,
        @response() res: Response,
        @request() req: Request
    ) {
        try {
            const payloadId = req.user?.id;

            if (!payloadId) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            const createGroupDTO: CreateGroupDTO = {
                name: body.name,
                userId: payloadId,
                description: body.description
            }
            const { group } = await this.groupService.createGroup(createGroupDTO);

            const GroupOutputDTO = {
                name: group.name
            }

            return res.status(201).json(GroupOutputDTO)

        } catch (e) {
            console.error("Error creating group:", e);
            return res.status(500).json({
                message: 'Error creating group'
            });
        }
    }

}
