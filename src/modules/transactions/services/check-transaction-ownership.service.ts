import { Injectable, NotFoundException } from "@nestjs/common";
import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";

@Injectable()
export class CheckTransactionOwnershipService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository
  ) {}

  async check(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepository.findFirst({
      where: { id: transactionId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException("You do not own this transaction");
    }
  }
}