import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class CheckBankAccountOwnershipService {
  constructor(private readonly bankAccountsRepository: BankAccountsRepository) {}

  async check(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepository.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!isOwner) throw new NotFoundException('Bank account not found');
  }
}
