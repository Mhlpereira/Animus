import {  IsEmail, IsNotEmpty } from "class-validator";


export class RegisterDTO{
    @IsEmail()
    @IsNotEmpty({message: "Email is required"})
    email: string;

    @IsNotEmpty({message: "Password is required"})
    password: string;

    @IsNotEmpty({message: "Name is required"})
    name: string;

    @IsNotEmpty({message: "Birthday is required"})
    birthday: Date;
}