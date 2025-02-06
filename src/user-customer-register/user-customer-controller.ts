import { RegisterDTO } from './DTO/registerDTO';
import { Router , Request as req , Response as res } from "express";
import { UserCustomerService } from "./user-customer-service";
import { injectable , inject } from 'inversify';

@injectable()
export class UserCustomerController{
    public registerUserCustomerRoutes = Router();

    constructor(
        @inject(UserCustomerService) private userCustomerService: UserCustomerService) {
            this.initializeRoutes();
        }

        private initializeRoutes() {
            this.registerUserCustomerRoutes.post('/', this.registerUserWithCustomer)
        }


        private async registerUserWithCustomer (req, res) {
            try{
            const registerDTO = req.body as RegisterDTO;
            
            if(registerDTO.password !== registerDTO.confirmPassword){
                res.status(400).json({message: "Passwords do not match"});
                return;
            }

            const result = await this.userCustomerService.createUserWithCustomer(registerDTO);
            res.status(201).json(result);
            } catch(e) {
                res.status(400).json({message: e.message});
            }
        };
    }
