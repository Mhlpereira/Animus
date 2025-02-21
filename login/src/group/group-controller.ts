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
            const created = await this.groupService.createGroup(createGroupDTO);


            return res.status(201).json({message: "group created!"})

        } catch (e) {
            console.error("Error creating group:", e);
            return res.status(400).json({
                message: 'Error creating group'
            });
        }
    }

}
