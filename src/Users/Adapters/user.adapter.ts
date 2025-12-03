import { CreateNewUserOut } from "../Dtos/Out/create.users";
import { findUserOut } from "../Dtos/Out/find.user";
import { Users } from "../Mongo/users.schema";

export class UserAdapter {
    static toCreatedUser(user: Users): CreateNewUserOut {
        const dto = new CreateNewUserOut();
        dto.email = user.email;
        dto.senha = user.senha;
        return dto;
    }

    static toFindOneUser(user:Users): findUserOut {
        const dto = new findUserOut()
        dto.idUser = user._id.toString()
        dto.email = user.email
        dto.senha = user.senha
        dto.role = user.role
        return dto
    }
}