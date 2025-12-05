import { IsNotEmpty, IsString } from "class-validator"
import { Role } from "src/Auth/Role/role.enum"

export class FindUserOut {
    @IsNotEmpty()
    @IsString()
    idUser:String
    @IsNotEmpty()
    @IsString()
    email:string
    
    @IsNotEmpty()
    @IsString()
    senha:string

    @IsNotEmpty()
    @IsString()
    role:Role[]
}