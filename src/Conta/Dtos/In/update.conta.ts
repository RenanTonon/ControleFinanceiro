import { IsNotEmpty, IsString } from "class-validator";

export class UpdateContaIn {
    @IsNotEmpty()
    @IsString()
    userId:string

    @IsNotEmpty()
    @IsString()
    contaId:string
    
    @IsString()
    nomeCategoria:string
    
    @IsString()
    valor:string
    
    @IsString()
    data:string
        
    @IsString()
    observacoes:string
    
}