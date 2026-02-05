import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { ExpenseListViewStore } from "./domain/store/expense-view-store.service";
import { ExpenseRepositoryService } from "./domain/expense-repository.service";
import { CategoryStore } from "./domain/store/category.store";
import { ExpenseService } from "./expense-service";
import { IsEditablePipe } from "./expense-edit/is-editable.pipe";
import { UniqueExpenseDateValidator } from "./expense-create/unique-expense-date-validator.service";
import { ExpensesHttpService } from "./data-access/expenses-http.service";
import { CategoriesHttpService } from "./data-access/categories-http.service";

export function provideExpenses(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ExpensesHttpService,
    CategoriesHttpService,
    ExpenseListViewStore,
    CategoryStore,
    ExpenseRepositoryService,
    ExpenseService,
    IsEditablePipe,
    UniqueExpenseDateValidator,
  ]);
}
