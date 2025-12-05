import { IsString } from "class-validator"

export class CreateContaOut {

    @IsString()
    nomeCategoria:string
        
    @IsString()
    valor:string
        
    @IsString()
    data:string
            
    @IsString()
    observacoes:string
    
}