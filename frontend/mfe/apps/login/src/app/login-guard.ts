import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@mfe/auth';
import { inject } from '@angular/core';

/**
 * Allows to skip login page during navigation if the user is already logged in.
 */
export const loginGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn()
    ? inject(Router).createUrlTree([''])
    : true;
};
