import { Module } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { MembrosController } from './membros.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [MembrosService, PrismaService],
  controllers: [MembrosController],
  exports: [MembrosService],
})
export class MembrosModule {}
