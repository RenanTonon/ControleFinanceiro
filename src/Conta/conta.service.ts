import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Conta } from "./Mongo/conta.schema";
import { Model } from "mongoose";
import { GetAllContasOut } from "./Dtos/Out/get.all.contas";
import { ContaAdapter } from "./Adapters/conta.adapter";
import { CreateContaIn } from "./Dtos/In/create.conta";
import { CreateContaOut } from "./Dtos/Out/create.conta";
import { UpdateContaIn } from "./Dtos/In/update.conta";
import { UpdateContaOut } from "./Dtos/Out/update.conta";
import { DeleteContaIn } from "./Dtos/In/delete.conta";

@Injectable()
export class ContaService {
    
    constructor(@InjectModel('contas') private contasModel: Model<Conta>){}

    async getAllContas(idUser:string): Promise<GetAllContasOut[]>{
        const existConta = await this.contasModel.find({idUser: idUser})
        if(!existConta){throw new BadGatewayException("Não existe contas criadas para esse usuário")}
        return ContaAdapter.toGetAllContas(existConta)
    }

    async createConta(conta: CreateContaIn): Promise<CreateContaOut>{
        const newConta = new this.contasModel(conta)
        return newConta.save()
    }
    async updateConta(conta: UpdateContaIn): Promise<UpdateContaOut>{
        const existConta = await this.contasModel.findOne({_id: conta.contaId})
        if(!existConta){throw new BadGatewayException("Não foi possivel encontrar a conta")}
        existConta.nomeCategoria = conta.nomeCategoria
        existConta.valor = conta.valor
        existConta.data = conta.data
        existConta.observacoes = conta.observacoes
        const saveConta = await existConta.save()
        return ContaAdapter.toUpdateConta(saveConta);
    }

    async deleteConta(conta: DeleteContaIn): Promise<string>{
        const findUser = this.contasModel.findByIdAndDelete(conta.idConta)
        if(!findUser){throw new BadGatewayException("Essa conta não existe")}
        return "Conta excluida."
    }
}