import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { UserRepository } from './repositories/user.repositories';

@Global()
@Module({
  providers: [PrismaService, UserRepository, CategoriesRepository, BankAccountsRepository],
  exports: [PrismaService, UserRepository, CategoriesRepository, BankAccountsRepository],
})
export class DatabaseModule {}
