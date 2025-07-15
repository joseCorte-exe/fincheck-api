import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { CheckBankAccountOwnershipService } from '../../bank-accounts/services/check-bank-account-ownership.service';
import { CheckCategoryOwnershipService } from '../../categories/services/check-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { CheckTransactionOwnershipService } from './check-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly checkBankAccountOwnershipService: CheckBankAccountOwnershipService,
    private readonly checkCategoryOwnershipService: CheckCategoryOwnershipService,
    private readonly checkTransactionOwnershipService: CheckTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, type, value, date, name } = createTransactionDto;
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });
  
    return this.transactionsRepository.create({
      data: {
        bankAccountId,
        categoryId,
        type,
        value,
        date,
        name,
        userId,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({
      where: { userId },
    });
  }

  update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, type, value, date, name } = updateTransactionDto;

    this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepository.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        type,
        value,
        date,
        name,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.checkTransactionOwnershipService.check(userId, transactionId);

    await this.transactionsRepository.delete({
      where: { id: transactionId },
    });
  }

  private async validateEntitiesOwnership(
    {
      userId,
      bankAccountId,
      categoryId,
      transactionId
    }: {
      userId: string,
      bankAccountId: string,
      categoryId: string,
      transactionId?: string
    }) {
    await Promise.all([
      transactionId && this.checkTransactionOwnershipService.check(userId, transactionId),
      this.checkBankAccountOwnershipService.check(userId, bankAccountId),
      this.checkCategoryOwnershipService.check(userId, categoryId),
    ])
  }
}
