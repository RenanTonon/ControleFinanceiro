import { GetAllContasOut } from "../Dtos/Out/get.all.contas";
import { UpdateContaOut } from "../Dtos/Out/update.conta";
import { Conta } from "../Mongo/conta.schema";

export class ContaAdapter {
    static toGetAllContas(contas: Conta[]): GetAllContasOut[] {
        return contas.map(conta => {
            const dto = new GetAllContasOut()
            dto.idConta = String(conta._id)
            dto.idUser = conta.idUser
            dto.nomeCategoria = conta.nomeCategoria
            dto.data = conta.data
            dto.valor = conta.valor
            dto.observacoes = conta.observacoes
            return dto
        })
    }

    static toUpdateConta(conta: Conta): UpdateContaOut{
        const dto = new UpdateContaOut()
        dto.nomeCategoria = conta.nomeCategoria
        dto.valor = conta.valor
        dto.data = conta.data
        dto.observacoes = conta.observacoes
        return dto
    }
}