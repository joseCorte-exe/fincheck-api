import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './services/bank-accounts.service';
import { CheckBankAccountOwnershipService } from './services/check-bank-account-ownership.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, CheckBankAccountOwnershipService],
  exports: [CheckBankAccountOwnershipService],
})
export class BankAccountsModule {}
