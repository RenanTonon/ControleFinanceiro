import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Conta {
    _id: mongoose.Schema.Types.ObjectId;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users', required:true})
    idUser:string

    @Prop()
    nomeCategoria:string

    @Prop({required:true})
    valor:string

    @Prop({required:true})
    data:string
    
    @Prop()
    observacoes:string
    
}

export const ContaSchema = SchemaFactory.createForClass(Conta);