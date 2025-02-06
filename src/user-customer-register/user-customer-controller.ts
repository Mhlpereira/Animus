import { RegisterDTO } from './DTO/registerDTO';
import { IUserCustomerService } from './user-customer-interface';
import { Router , Request as req , Response as res } from "express";
import { injectable , inject } from 'inversify';

@injectable()
export class UserCustomerController<TUser, TCustomer> {
    public registerUserCustomerRoutes = Router();

    constructor(
        @inject('IUserCustomerService') 
        private userCustomerService: IUserCustomerService<TUser, TCustomer>) {
            this.initializeRoutes();
        }

        private initializeRoutes() {
            this.registerUserCustomerRoutes.post('/', this.registerUserWithCustomer)
        }


        private async registerUserWithCustomer (req, res) {
            try{
            const registerDTO = req.body as RegisterDTO;
            console.log("Controller antes de chamar", registerDTO);
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
