import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/Users/users.service';
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){}

    async signIn(email:string, pass:string): Promise<any>{
        const user = await this.userService.findOneUserByEmail(email);
        if(!user){
            throw new UnauthorizedException("Senha ou email invalido.")
        }
        const isMatch = await bcrypt.compare(pass, user.senha)
        if(!isMatch){
            throw new UnauthorizedException("Senha ou email invalido.")
        }
        
        const payload = { sub: user.idUser, username: user.email, role: user.role }
        return {acess_token: await this.jwtService.signAsync(payload)}
    }

}
