import { computed, inject, Injectable, signal } from "@angular/core";
import { User } from "../../features/user/domain/user.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // todo: localStorage ?
  private readonly _user = signal<User | null>(null);
  private readonly _loggedOut = new Subject<void>();
  private readonly router = inject(Router);

  readonly user = this._user.asReadonly();
  readonly loggedOut$ = this._loggedOut.asObservable();

  readonly isLoggedIn = computed(() => this.user() !== null);

  login(user: User): void {
    this._user.set(user);
  }

  logout(): void {
    this._user.set(null);
    this._loggedOut.next();
    this.router.navigate(["/login"]);
  }
}
