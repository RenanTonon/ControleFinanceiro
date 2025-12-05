import { IsString } from "class-validator"

export class UpdateUserOut {
    @IsString()
    nome:string
        
    @IsString()
    email:string
    
    @IsString()
    senha:string
    
    @IsString()
    dataNascimento:string

}