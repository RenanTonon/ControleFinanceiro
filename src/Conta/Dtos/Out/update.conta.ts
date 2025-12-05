import { IsString } from "class-validator"

export class UpdateContaOut {

        @IsString()
        nomeCategoria:string
        
        @IsString()
        valor:string
        
        @IsString()
        data:string
            
        @IsString()
        observacoes:string
}