import { Pipe, PipeTransform } from "@angular/core";
import { Expense } from "../domain/models/expense.model";

@Pipe({
  name: "isEditable",
  standalone: true,
})
export class IsEditablePipe implements PipeTransform {
  transform(value: Expense): unknown {
    return !value.isSubmitted;
  }
}
