import { Module } from '@nestjs/common';
import { UserModule } from './Users/users.module';
import {MongooseModule} from '@nestjs/mongoose'
import { AuthModule } from './Auth/auth.module';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Auth/Role/role.guard';
import { AuthGuard } from './Auth/auth.guard';
 @Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/controle-financeiro'),
    ConfigModule.forRoot({isGlobal:true,}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService ) => ({
        secret:config.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '1h'}
      }),
      inject: [ConfigService]
      
    })
    ,UserModule,AuthModule],
  controllers: [],
  providers: [{provide: APP_GUARD, useClass: AuthGuard},{provide: APP_GUARD, useClass: RolesGuard}],
})
export class AppModule {}
