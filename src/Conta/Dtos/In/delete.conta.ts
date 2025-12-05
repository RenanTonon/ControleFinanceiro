import { IsNotEmpty, IsString, Length } from "class-validator";

export class DeleteContaIn {
    @IsNotEmpty()
    @IsString()
    @Length(24,24)
    idConta:string
}