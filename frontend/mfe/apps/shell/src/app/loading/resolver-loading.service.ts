import { inject, Injectable, signal } from "@angular/core";
import { ResolveEnd, ResolveStart, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class ResolverLoadingService {
  private readonly router = inject(Router);

  private readonly _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof ResolveStart) {
        this._loading.set(true);
      }
      if (event instanceof ResolveEnd) {
        this._loading.set(false);
      }
    });
  }
}
