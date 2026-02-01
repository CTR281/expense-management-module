import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

/**
 * Protects authenticated routes by redirecting to /login if the user is not logged in.
 */
export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn()
    ? true
    : inject(Router).createUrlTree(["/login"]);
};
