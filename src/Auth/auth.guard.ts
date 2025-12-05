import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config'
import { Request } from 'express';
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private config: ConfigService, private refletor: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.refletor.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
        if(isPublic){
            return true
        }


        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token) {
            throw new UnauthorizedException('Não está autenticado.');
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {secret: this.config.get<string>('JWT_SECRET'), }
            )
            request.user = payload
        }catch{
            throw new UnauthorizedException("Token inválido ou expirado")
        }

        return true
    }

    private extractTokenFromHeader(request: Request):string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}