import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './Mongo/users.schema';
import { AuthModule } from 'src/Auth/auth.module';
import { AuthGuard } from 'src/Auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name: 'users', schema: UserSchema}]),
      ConfigModule.forRoot({isGlobal:true,}),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService ) => ({
          secret:config.get<string>('JWT_SECRET'),
          signOptions: {expiresIn: '1h'}
        }),
        inject: [ConfigService]
        
      })
      ,],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
