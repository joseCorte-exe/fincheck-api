import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(input: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(input)
  }

  findUnique(input: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(input)
  }
}