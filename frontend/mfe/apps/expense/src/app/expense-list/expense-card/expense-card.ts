import { Component, input } from "@angular/core";
import { Expense } from "../../domain/models/expense.model";
import { DatePipe, DecimalPipe } from "@angular/common";
import { StatusBadge } from "../../shared/ui/status-badge";

@Component({
  selector: "mfe-expense-card",
  imports: [DecimalPipe, DatePipe, StatusBadge],
  templateUrl: "./expense-card.html",
  styleUrl: "./expense-card.css",
  host: {
    class: "card",
  },
})
export class ExpenseCard {
  readonly expense = input.required<Expense>();
}
