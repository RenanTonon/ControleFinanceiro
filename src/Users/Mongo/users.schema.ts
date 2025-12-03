import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Role } from 'src/Auth/Role/role.enum';

@Schema()
export class Users {
    _id: mongoose.Schema.Types.ObjectId;
    @Prop({required:true})
    nome:string

    @Prop({required:true})
    email:string

    @Prop({required:true})
    senha:string

    @Prop({required:true})
    dataNascimento:string

    @Prop({required:true, default:Role.User})
    role:Role[]
    
}

export const UserSchema = SchemaFactory.createForClass(Users);