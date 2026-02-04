import { computed, inject, Injectable, signal } from "@angular/core";
import { User } from "../../features/user/domain/user.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private static readonly STORAGE_KEY = "auth_user";
  private readonly _user = signal<User | null>(this.loadFromStorage());
  private readonly _loggedOut = new Subject<void>();
  private readonly router = inject(Router);

  readonly user = this._user.asReadonly();
  readonly loggedOut$ = this._loggedOut.asObservable();

  readonly isLoggedIn = computed(() => this.user() !== null);

  login(user: User): void {
    this._user.set(user);
    localStorage.setItem(AuthService.STORAGE_KEY, JSON.stringify(user));
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(AuthService.STORAGE_KEY);
    this._loggedOut.next();
    this.router.navigate(["/login"]);
  }

  private loadFromStorage(): User {
    const data = localStorage.getItem(AuthService.STORAGE_KEY);
    if (!data) return null;

    try {
      return JSON.parse(data) as User;
    } catch {
      localStorage.removeItem(AuthService.STORAGE_KEY);
      return null;
    }
  }
}
