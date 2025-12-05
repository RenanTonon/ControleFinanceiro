import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/Users/users.module';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[UserModule, ConfigModule.forRoot({isGlobal:true,}), JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService ) => ({
          secret:config.get<string>('JWT_SECRET'),
          signOptions: {expiresIn: '1h'}
        }),
        inject: [ConfigService]})],
  controllers: [AuthController],
  providers: [AuthGuard,AuthService],
  exports:[AuthGuard]
})
export class AuthModule {}
