import { inject, Injectable, signal } from "@angular/core";
import { Category } from "../models/category.model";
import { finalize, Observable, of, tap } from "rxjs";
import { ExpenseRepositoryService } from "../expense-repository.service";
import { Store } from "../../../../core/store/store.model";

@Injectable()
export class CategoryStore implements Store<Category[]> {
  private readonly expenseService = inject(ExpenseRepositoryService);

  private readonly _categories = signal<Category[] | null>(null);
  private readonly _loading = signal<boolean>(false);

  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();

  load(): Observable<Category[]> {
    if (this._categories()) {
      return of(this._categories() as Category[]);
    }
    return this.fetch();
  }

  private fetch() {
    this._loading.set(true);
    return this.expenseService.getCategories().pipe(
      tap((categories) => {
        this._categories.set(categories);
      }),
      finalize(() => this._loading.set(false))
    );
  }
}
