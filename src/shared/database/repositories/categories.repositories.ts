import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(input: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(input)
  }

  findFirst(input: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(input)
  }
}