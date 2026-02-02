import { Component, inject } from "@angular/core";
import { IconBackComponent } from "../../../shared/ui/icons/icon-back";
import { RouterLink } from "@angular/router";
import { CategoryStore } from "../domain/store/category.store";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-expense-create",
  imports: [RouterLink, AsyncPipe],
  templateUrl: "./expense-create.html",
  styleUrl: "./expense-create.css",
})
export class ExpenseCreate {
  private readonly categoryStore = inject(CategoryStore);

  protected readonly categories$ = this.categoryStore.load();
}
