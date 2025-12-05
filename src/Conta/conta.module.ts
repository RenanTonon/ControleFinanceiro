import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ContaController } from './conta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContaService } from './conta.service';
import { ContaSchema } from './Mongo/conta.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'contas', schema: ContaSchema}]), JwtModule],
  controllers: [ContaController],
  providers: [ContaService],
  exports:[]
})
export class ContaModule {}