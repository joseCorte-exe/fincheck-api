import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repositories';
import { UserRepository } from './repositories/user.repositories';

@Global()
@Module({
  providers: [PrismaService, UserRepository, CategoriesRepository],
  exports: [PrismaService, UserRepository, CategoriesRepository],
})
export class DatabaseModule {}
