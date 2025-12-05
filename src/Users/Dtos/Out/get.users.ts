import { IsString } from "class-validator"
import { Role } from "src/Auth/Role/role.enum"

export class getAllUsersOut {

    @IsString()
    idUser:string

    @IsString()
    nome:string
            
    @IsString()
    email:string
    
    @IsString()
    senha:string
        
    @IsString()
    dataNascimento:string

    @IsString()
    role:Role[]
}