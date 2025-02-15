import { IsEmail, IsNotEmpty } from 'class-validator'

export class ChangeUserEmailDTO {

  @IsNotEmpty({ message: 'Password needed'})
  password: string

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  newEmail: string


  @IsEmail()
  @IsNotEmpty({ message: "Email is required"})
  confirmEmail: string
}
