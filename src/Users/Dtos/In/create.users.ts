import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/Auth/Role/role.enum";

export class CreateNewUserIn {

    @IsNotEmpty()
    @IsString()
    nome:string

    @IsNotEmpty()
    @IsString()
    email:string

    @IsNotEmpty()
    @IsString()
    senha:string

    @IsNotEmpty()
    @IsString()
    dataNascimento:string

    @IsNotEmpty()
    @IsString()
    role:Role

}
