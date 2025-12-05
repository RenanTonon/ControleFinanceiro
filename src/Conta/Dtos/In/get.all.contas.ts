import { IsString, Length } from "class-validator";

export class GetAllContasIn {
    @IsString()
    @Length(24,24)
    idUser: string
}