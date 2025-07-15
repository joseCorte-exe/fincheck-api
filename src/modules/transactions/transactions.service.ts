import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { CheckBankAccountOwnershipService } from '../bank-accounts/services/check-bank-account-ownership.service';
import { CheckCategoryOwnershipService } from '../categories/services/check-category-ownership.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly checkBankAccountOwnershipService: CheckBankAccountOwnershipService,
    private readonly checkCategoryOwnershipService: CheckCategoryOwnershipService
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

  update(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${transactionId} transaction`;
  }

  remove(transactionId: string) {
    return `This action removes a #${transactionId} transaction`;
  }

  private async validateEntitiesOwnership({ userId, bankAccountId, categoryId }: { userId: string, bankAccountId: string, categoryId: string }) {
    await Promise.all([
      this.checkBankAccountOwnershipService.check(userId, bankAccountId),
      this.checkCategoryOwnershipService.check(userId, categoryId),
    ])
  }
}
