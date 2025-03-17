import { IsNotEmpty } from "class-validator";


export class DeleteUserDTO{
    id: string;
    @IsNotEmpty({message: "Password is required"})
    password: string;
}