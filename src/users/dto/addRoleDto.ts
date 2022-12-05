import { IsNumber, IsString } from "class-validator"

export class addRoleDto {
    @IsString({message: "Should be a string"})
    readonly value: string

    @IsNumber({}, {message: "Should be a string"})
    readonly userId: number
}