import { Component, inject } from "@angular/core";
import { ExpenseRepositoryService } from "../domain/expense-repository.service";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";
import { Expense } from "../domain/models/expense.model";
import { ExpenseStore } from "../domain/store/expense.store";
import { CategoryStore } from "../domain/store/category.store";
import { Category } from "../domain/models/category.model";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-expense-list",
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./expense-list.html",
  styleUrl: "./expense-list.css",
})
export class ExpenseList {
  private readonly expenseService = inject(ExpenseRepositoryService);
  private readonly expenseStore = inject(ExpenseStore);
  private readonly categoryStore = inject(CategoryStore);

  readonly expenses$: Observable<Expense[]> = this.expenseStore.load();
  readonly categories$: Observable<Category[]> = this.categoryStore.load();
}
