import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./Mongo/users.schema";
import { Model } from "mongoose";
import { CreateNewUserIn } from "./Dtos/In/create.users";
import { CreateNewUserOut } from "./Dtos/Out/create.users";
import { UserAdapter } from "./Adapters/user.adapter";
import { FindUserOut } from "./Dtos/Out/find.user";
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { UpdateUserIn } from "./Dtos/In/update.user";
import { UpdateUserOut } from "./Dtos/Out/update.user";
import { getAllUsersOut } from "./Dtos/Out/get.users";

@Injectable()
export class UserService {
   

    constructor(@InjectModel('users') private userModel: Model<Users>, private configService: ConfigService){}

    async createUser(newUser: CreateNewUserIn): Promise<CreateNewUserOut> {
        const findUser = await this.userModel.findOne({email: newUser.email});
        if(findUser){throw new BadRequestException('Email já existe')}

        const saltRounds = Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS')) ?? 2
        newUser.senha = await bcrypt.hash(newUser.senha, saltRounds)

        const saveUser = new this.userModel(newUser);
        const userNew =  await saveUser.save();
        if(!userNew){throw new BadRequestException('Não foi possivel criar usuário')}
        return UserAdapter.toCreatedUser(userNew);
    }

    async findOneUserById(idUser:string): Promise<FindUserOut> {
        const findUser = await this.userModel.findById(idUser);
        if(!findUser){throw new BadRequestException('Usuário não encontrado')}
        return UserAdapter.toFindOneUser(findUser)
    }

    async findOneUserByEmail(emailUser:string):Promise<FindUserOut>{
        const findUser = await this.verifyExistUserWithEmail(emailUser)
        return UserAdapter.toFindOneUser(findUser)
    }

    async getAllUsers():Promise<getAllUsersOut[]>{
        const findUsersAll = await this.userModel.find()
        return UserAdapter.toGetAllUsers(findUsersAll)
    }

    async updateOneUserById(user: UpdateUserIn): Promise<UpdateUserOut>{
        
        const userFind = await this.userModel.findById(user.idUser)
        if(!userFind){throw new BadRequestException('Usuário não encontrado')}
        userFind.nome = user.nome

        const saltRounds = Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS')) ?? 2
        userFind.senha = await bcrypt.hash(user.senha, saltRounds)

        userFind.dataNascimento = user.dataNascimento

        const userUpdate = await userFind.save()
        return UserAdapter.toUpdateOneUser(userUpdate)
    }

    async deleteOneUserById(userId:string):Promise<string>{
        const deleteUser = await this.userModel.findByIdAndDelete(userId)
        if(!deleteUser){throw new BadRequestException('Usuário não encontrado')}
        return `Usuário deletado`
    }

    private async verifyExistUserWithEmail(email:string): Promise<Users>{
        const findUser = await this.userModel.findOne({email: email});
        if(!findUser){throw new BadRequestException('Usuário não encontrado')}
        return findUser
    }
}