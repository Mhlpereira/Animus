import { Equals, IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class RegisterDTO {
    @IsEmail()
    @IsNotEmpty({ message: "Email is required" })
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Password must have at least 6 characters!" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    })
    password: string;

    @MinLength(6, { message: "Password must have at least 6 characters!" })
    @Equals('password', { message: "Passwords do not match" })
    confirmedPassword: string;

    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsNotEmpty({ message: "Birthday is required" })
    birthday: Date;
}