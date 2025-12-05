import { IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateUserIn {
    @IsNotEmpty()
    @IsString()
    @Length(24,24)
    idUser:string

    @IsString()
    nome:string
    
    @IsString()
    senha:string

    @IsString()
    dataNascimento:string
}