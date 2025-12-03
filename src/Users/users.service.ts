import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./Mongo/users.schema";
import { Model } from "mongoose";
import { CreateNewUserIn } from "./Dtos/In/create.users";
import { CreateNewUserOut } from "./Dtos/Out/create.users";
import { UserAdapter } from "./Adapters/user.adapter";
import { findUserOut } from "./Dtos/Out/find.user";
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(@InjectModel('users') private userModel: Model<Users>, private configService: ConfigService){}

    async createUser(newUser: CreateNewUserIn): Promise<CreateNewUserOut> {
        const exists = await this.userModel.findOne({email: newUser.email})
        if(exists) throw new BadRequestException('Email já cadastrado')

        const saltRounds = Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS')) ?? 2
        newUser.senha = await bcrypt.hash(newUser.senha, saltRounds)

        const saveUser = new this.userModel(newUser);
        const userNew =  await saveUser.save();
        if(!userNew){throw new BadRequestException('Não foi possivel criar usuário')}
        return UserAdapter.toCreatedUser(userNew);
    }

    async findOneUserById(idUser:string): Promise<findUserOut> {
        const findUser = await this.userModel.findById(idUser);
        if(!findUser){throw new BadRequestException('Usuário não encontrado')}
        return UserAdapter.toFindOneUser(findUser)
    }

    async findOneUserByEmail(emailUser:string):Promise<findUserOut>{
        const findUser = await this.userModel.find({email: emailUser});
        if(!findUser){throw new BadRequestException('Usuário não encontrado')}
        return UserAdapter.toFindOneUser(findUser[0])
    }
    
}