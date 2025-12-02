import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/Users/users.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService){}

    async signIn(email:string, pass:string): Promise<any>{
        const user = await this.userService.findOneUserByEmail(email);
        if(user?.senha !== pass){
            throw new UnauthorizedException("Senha ou email invalido.")
        }
        const { senha, ...result} = user;
        return result
    }

}
