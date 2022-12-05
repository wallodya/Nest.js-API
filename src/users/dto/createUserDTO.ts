import { IsAlpha, IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString({message: "Has to be s string"})
    @IsAlpha()
    @IsEmail({}, {message: "Should be in foo@bar.com format"})
    readonly email: string
    
    @IsString({message: "Has to be s string"})
    @Length(4, 16, {message: "Should have length from 4 to 16"})
    readonly password: string
}