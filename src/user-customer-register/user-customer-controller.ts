import { RegisterDTO } from './DTO/registerDTO';
import { Router } from "express";
import { UserCustomerService } from "./user-customer-service";

export const registerUserCustomerRoutes = Router();

registerUserCustomerRoutes.post('/', async(req, res) => {
    const registerDTO = req.body as RegisterDTO;
    const userCustomerService = new UserCustomerService();

    const result = await userCustomerService.registerUser(registerDTO);
    res.status(201).json(result);
})
