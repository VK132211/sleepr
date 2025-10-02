import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUerDto{
    @IsEmail()
    email:string;
    @IsStrongPassword()
    password:string;
}