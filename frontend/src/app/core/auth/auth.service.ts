import { computed, inject, Injectable, signal } from "@angular/core";
import { User } from "../../domain/user/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // TODO: leverage caching
  private readonly _user = signal<User | null>(null);
  private readonly router = inject(Router);
  readonly user = this._user.asReadonly();

  readonly isLoggedIn = computed(() => this.user() !== null);

  login(user: User): void {
    this._user.set(user);
  }

  logout(): void {
    this._user.set(null);
    this.router.navigate(["/"]);
  }
}
