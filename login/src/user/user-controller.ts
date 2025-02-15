import { authMiddleware } from './../middleware/auth-middleware';
import { inject } from "inversify";
import { httpGet, BaseHttpController, interfaces, controller, httpPost, httpPut, requestBody, response, request } from "inversify-express-utils";
import { IUserService } from "./user-interface";
import { ChangeUserPasswordDTO } from "./DTO/change-password-DTO";
import { Request, Response } from "express";


@controller('/user')
export class UserController {
    //midleware provisório
    constructor(
        @inject('IUserService') private userService: IUserService,
        @inject('Authmiddleware') private
    ) {}
}

    @httpPut('/changePassword', authMiddleware)
   async changePassword(
    @requestBody() body: ChangeUserPasswordDTO, 
    @response() res: Response,
    @request() req: Request){
    try{
        if (body.password !== body.confirmedPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        const id = req.user.id

        

        await this.userService.changePassword()
    }
   }

   


