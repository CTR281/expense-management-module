import { Component, input } from "@angular/core";
import { Expense } from "../../domain/models/expense.model";
import { DatePipe, DecimalPipe } from "@angular/common";

@Component({
  selector: "app-expense-card",
  imports: [DecimalPipe, DatePipe],
  templateUrl: "./expense-card.html",
  styleUrl: "./expense-card.css",
  host: {
    class: "card",
  },
})
export class ExpenseCard {
  readonly expense = input<Expense>();
}
