import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(input: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(input);
  }

  findFirst(input: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(input);
  }

  create(input: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(input)
  }

  update(input: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(input);
  }

  delete(input: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(input);
  }
}