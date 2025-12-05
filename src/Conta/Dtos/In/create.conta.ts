import { IsString, Length } from "class-validator"

export class CreateContaIn {

    @IsString()
    @Length(24,24)
    idUser:string

    @IsString()
    nomeCategoria:string
    
    @IsString()
    valor:string
    
    @IsString()
    data:string
        
    @IsString()
    observacoes:string
}