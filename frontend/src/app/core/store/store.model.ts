import { Observable } from "rxjs";
import { Directive, inject, Signal } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export interface Store<T> {
  /**
   * Returns store data if available, else fetches it
   */
  load(): Observable<T>;
  /**
   * Resets store data
   */
}

export interface StoreState<T> {
  data: Signal<T | null>;
  loading: Signal<boolean>;
}

@Directive()
export abstract class SessionScopedStore<T> implements Store<T> {
  protected readonly authService = inject(AuthService);
  protected isStale = false;

  constructor() {
    this.authService.loggedOut$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.reset();
    });
  }

  abstract load(): Observable<T>;

  invalidate(): void {
    this.isStale = true;
  }

  abstract reset(): void;

  refresh(): Observable<T> {
    this.invalidate();
    return this.load();
  }
  /**
   * Fetch the data from the API and update the store data
   * @private
   * @return the data fetched from the API
   */
  protected abstract fetch(): Observable<T>;
}
