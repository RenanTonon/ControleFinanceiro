import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ContaService } from "./conta.service";
import { AuthGuard } from "src/Auth/auth.guard";
import { Roles } from "src/Auth/Role/role.decorator";
import { Role } from "src/Auth/Role/role.enum";
import { GetAllContasIn } from "./Dtos/In/get.all.contas";
import { GetAllContasOut } from "./Dtos/Out/get.all.contas";
import { CreateContaIn } from "./Dtos/In/create.conta";
import { CreateContaOut } from "./Dtos/Out/create.conta";
import { UpdateContaIn } from "./Dtos/In/update.conta";
import { UpdateContaOut } from "./Dtos/Out/update.conta";
import { DeleteContaIn } from "./Dtos/In/delete.conta";
@Controller('contas')
export class ContaController {
    
    constructor(private contaService: ContaService){}

    @UseGuards(AuthGuard)
    @Roles(Role.Admin, Role.User)
    @Get(':id')
    async getAllContas(@Param() user: GetAllContasIn):Promise<GetAllContasOut[]>{
        return await this.contaService.getAllContas(user.idUser)
    }

    @Post()
    async createConta(@Body() conta: CreateContaIn ): Promise<CreateContaOut>{
        return await this.contaService.createConta(conta);
    }
    @Patch()
    async updateConta(@Body() conta:UpdateContaIn):Promise<UpdateContaOut>{
        return await this.contaService.updateConta(conta)
    }

    @Delete()
    async deleteConta(@Body() conta:DeleteContaIn): Promise<string>{
        return this.contaService.deleteConta(conta)
    }
}