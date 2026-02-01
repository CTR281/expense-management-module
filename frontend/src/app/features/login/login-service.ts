import { inject, Injectable, signal } from "@angular/core";
import { UserRepository } from "../../domain/user/user-repository";
import { User } from "../../domain/user/user.model";
import { catchError, EMPTY, finalize, Observable } from "rxjs";
import { AuthService } from "../../core/auth/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../core/notification/notification-service";

@Injectable()
export class LoginService {
  private readonly userRepository = inject(UserRepository);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  readonly loading = signal<boolean>(false);

  /**
   * Load all users from backend.
   *
   * If users could not be loaded, notify the client.
   */
  loadUsers(): Observable<User[]> {
    this.loading.set(true);
    return this.userRepository.getUsers().pipe(
      catchError((err) => {
        //console.error(err); // TODO: push to dedicated logging service
        this.notificationService.error("Could not load users.");
        return EMPTY;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Activate selected user for the session, then navigates to home.
   * @param user
   */
  login(user: User): void {
    this.authService.login(user);
    this.router.navigate(["/home"]);
  }
}
