import { CreateNewUserOut } from "../Dtos/Out/create.users";
import { FindUserOut } from "../Dtos/Out/find.user";

import { getAllUsersOut } from "../Dtos/Out/get.users";
import { UpdateUserOut } from "../Dtos/Out/update.user";
import { Users } from "../Mongo/users.schema";

export class UserAdapter {
    static toCreatedUser(user: Users): CreateNewUserOut {
        const dto = new CreateNewUserOut();
        dto.email = user.email;
        dto.senha = user.senha;
        return dto;
    }

    static toFindOneUser(user:Users): FindUserOut {
        const dto = new FindUserOut()
        dto.idUser = user._id.toString()
        dto.email = user.email
        dto.senha = user.senha
        dto.role = user.role
        return dto
    }

    static toUpdateOneUser(user:Users): UpdateUserOut {
        const dto = new UpdateUserOut()
        dto.nome = user.nome
        dto.email = user.email
        dto.senha = user.senha
        dto.dataNascimento = user.dataNascimento
        return dto
    }

    static toGetAllUsers(users:Users[]): getAllUsersOut[] {
        return users.map(user => {
            const dto = new getAllUsersOut
            dto.idUser = String(user._id)
            dto.nome = user.nome
            dto.email = user.email
            dto.dataNascimento = user.dataNascimento
            dto.role = user.role
            return dto
        })
    }
}