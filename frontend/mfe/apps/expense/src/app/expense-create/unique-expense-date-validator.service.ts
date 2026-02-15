import { inject, Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from "@angular/forms";
import { ExpenseService } from "../expense-service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable()
export class UniqueExpenseDateValidator implements AsyncValidator {
  private readonly expenseService = inject(ExpenseService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.expenseService.checkExpenseUniqueness(control.value).pipe(
      map((isUnique) => (isUnique ? null : { isUnique: true })),
      catchError(() => of(null))
    );
  }
}
