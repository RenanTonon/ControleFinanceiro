import { IsNotEmpty, IsString, Length } from "class-validator";

export class deleteUserIn {
    @IsNotEmpty()
    @IsString()
    @Length(24,24)
    id:string
}