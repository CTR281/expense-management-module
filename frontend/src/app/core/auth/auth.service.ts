import { computed, Injectable, signal } from "@angular/core";
import { User } from "../../domain/user/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // TODO: leverage caching
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  readonly isLoggedIn = computed(() => this.user() !== null);

  private setUser(user: User | null) {
    this._user.set(user);
  }

  login(user: User): void {
    this.setUser(user);
  }

  logout(): void {
    this.setUser(null);
  }
}
