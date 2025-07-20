import { Module } from '@nestjs/common';
import { MembrosModule } from './membros/membros.module';
import { PrismaService } from './database/prisma.service';

import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MembrosModule, DatabaseModule, PostsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
