import { IsNotEmpty, MinLength, Matches } from "class-validator";

export class ChangeUserPasswordDTO{
    oldPassword: string;
    @IsNotEmpty({ message: "Password is required" })
        @MinLength(6, { message: "Password must have at least 6 characters!" })
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        })
    password: string;
    confirmedPassword: string;

}