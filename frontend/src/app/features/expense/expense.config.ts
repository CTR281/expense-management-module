import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { ExpenseViewStore } from "./domain/store/expense-view-store.service";
import { ExpenseRepositoryService } from "./domain/expense-repository.service";
import { CategoryStore } from "./domain/store/category.store";
import { ExpenseService } from "./expense-service";
import { IsEditablePipe } from "./expense-edit/is-editable.pipe";
import { UniqueExpenseDateValidator } from "./expense-create/unique-expense-date-validator.service";

export function provideExpenses(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ExpenseViewStore,
    CategoryStore,
    ExpenseRepositoryService,
    ExpenseService,
    IsEditablePipe,
    UniqueExpenseDateValidator,
  ]);
}
