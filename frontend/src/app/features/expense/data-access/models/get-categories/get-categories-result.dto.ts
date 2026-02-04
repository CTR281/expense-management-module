import { Category } from "../../../domain/models/category.model";

export interface GetCategoriesResultDto {
  items: Category[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
