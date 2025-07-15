import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { CheckBankAccountOwnershipService } from './check-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly checkBankAccountOwnershipService: CheckBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;
    return this.bankAccountsRepository.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      }
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({
      where: { userId },
      include: { transactions: true },
    });
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.checkBankAccountOwnershipService.check(userId, bankAccountId);

    return this.bankAccountsRepository.update({
      where: { id: bankAccountId },
      data: {
        name: updateBankAccountDto.name,
        initialBalance: updateBankAccountDto.initialBalance,
        type: updateBankAccountDto.type,
        color: updateBankAccountDto.color,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.checkBankAccountOwnershipService.check(userId, bankAccountId);

    this.bankAccountsRepository.delete({ where: { id: bankAccountId } });

    await this.bankAccountsRepository.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
