import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from "@angular/core";
import { ExpenseStore } from "./domain/store/expense.store";
import { ExpenseRepositoryService } from "./domain/expense-repository.service";
import { CategoryStore } from "./domain/store/category.store";
import { PageTitleService } from "../../core/page-title.service";
import { ExpenseService } from "./domain/expense-service";

export function provideExpenses(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ExpenseStore,
    CategoryStore,
    ExpenseRepositoryService,
    ExpenseService,
    provideEnvironmentInitializer(() =>
      inject(PageTitleService).setPageTitle("My Expenses")
    ), // TODO: text translate
  ]);
}
