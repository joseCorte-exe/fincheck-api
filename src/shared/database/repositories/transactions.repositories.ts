import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(input: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(input);
  }

  findFirst(input: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(input);
  }

  create(input: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(input)
  }

  update(input: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(input);
  }

  delete(input: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(input);
  }
}