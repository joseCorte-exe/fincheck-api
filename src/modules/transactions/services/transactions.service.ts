import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { CheckBankAccountOwnershipService } from '../../bank-accounts/services/check-bank-account-ownership.service';
import { CheckCategoryOwnershipService } from '../../categories/services/check-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionType } from '../entities/Transaction';
import { CheckTransactionOwnershipService } from './check-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly checkBankAccountOwnershipService: CheckBankAccountOwnershipService,
    private readonly checkCategoryOwnershipService: CheckCategoryOwnershipService,
    private readonly checkTransactionOwnershipService: CheckTransactionOwnershipService,
  ) {}

  async findAllByUserId(
    userId: string,
    filters: {
      month: number,
      year: number,
      bankAccountId?: string,
      type?: TransactionType
    }
  ) {
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId: filters.bankAccountId,
    });

    return await this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        }
      },
    });
  }

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

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, type, value, date, name } = updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return await this.transactionsRepository.update({
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
      bankAccountId?: string,
      categoryId?: string,
      transactionId?: string
    }) {
    await Promise.all([
      transactionId && this.checkTransactionOwnershipService.check(userId, transactionId),
      bankAccountId && this.checkBankAccountOwnershipService.check(userId, bankAccountId),
      categoryId && this.checkCategoryOwnershipService.check(userId, categoryId),
    ])
  }
}
