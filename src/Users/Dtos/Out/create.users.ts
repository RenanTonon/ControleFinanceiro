import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewUserOut {

    @IsNotEmpty()
    @IsString()
    email:string

    @IsNotEmpty()
    @IsString()
    senha:string
    
}
