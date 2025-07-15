import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { CheckCategoryOwnershipService } from './services/check-category-ownership.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CheckCategoryOwnershipService],
  exports: [CheckCategoryOwnershipService],
})
export class CategoriesModule {}
