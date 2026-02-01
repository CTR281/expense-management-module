import { inject, Injectable } from "@angular/core";
import { UserRepository } from "../../domain/user/user-repository";
import { User } from "../../domain/user/user.model";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private readonly userRepository = inject(UserRepository);

  loadUsers(): Observable<User[]> {
    return this.userRepository
      .getUsers()
      .pipe(
        catchError(() =>
          throwError(() => new Error("Could not retrieve Users"))
        )
      );
  }

  login(user: User): void {}
}

// TODO notify if error
