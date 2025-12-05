import { IsString } from "class-validator";

export class GetAllContasOut {

    @IsString()
    idConta:string
    
    @IsString()
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