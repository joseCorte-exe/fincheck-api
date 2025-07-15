import { Module } from '@nestjs/common';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { CheckTransactionOwnershipService } from './services/check-transaction-ownership.service';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, CheckTransactionOwnershipService],
})
export class TransactionsModule {}
