import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "src/shared/database/repositories/categories.repositories";

@Injectable()
export class CheckCategoryOwnershipService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  async check(userId: string, categoryId: string): Promise<void> {
    const category = await this.categoriesRepository.findFirst({
      where: { id: categoryId, userId },
    });

    if (!category) {
      throw new NotFoundException("Category not found or does not belong to the user");
    }
  }
}