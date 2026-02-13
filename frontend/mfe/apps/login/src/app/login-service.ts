import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { AuthService } from '@mfe/auth';
import { Router } from '@angular/router';
import { NotificationService } from '@mfe/notification';
import { User, UserRepositoryService } from '@mfe/user';

@Injectable()
export class LoginService {
  private readonly userService = inject(UserRepositoryService);
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
    return this.userService.getUsers().pipe(
      catchError(() => {
        this.notificationService.error('Could not load users.');
        return EMPTY;
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  /**
   * Activate selected user for the session, then navigates to home.
   * @param user
   */
  login(user: User): void {
    this.authService.login(user);
    this.router.navigate(['/']);
  }
}
