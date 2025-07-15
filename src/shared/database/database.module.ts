import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';
import { UserRepository } from './repositories/user.repositories';

@Global()
@Module({
  providers: [PrismaService, UserRepository, CategoriesRepository, BankAccountsRepository, TransactionsRepository],
  exports: [PrismaService, UserRepository, CategoriesRepository, BankAccountsRepository, TransactionsRepository],
})
export class DatabaseModule {}
