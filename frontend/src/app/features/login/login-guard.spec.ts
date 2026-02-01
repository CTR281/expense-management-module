import { TestBed } from "@angular/core/testing";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

import { loginGuard } from "./login-guard";
import { AuthService } from "../../core/auth/auth.service";

describe("loginGuard", () => {
  const executeGuard = () =>
    TestBed.runInInjectionContext(() =>
      loginGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });

  it("should redirect users that are logged in", () => {
    vi.spyOn(authService, "isLoggedIn").mockReturnValue(true);

    const result = executeGuard();

    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toEqual("/home");
  });

  it("should not redirect users that are not logged in", () => {
    vi.spyOn(authService, "isLoggedIn").mockReturnValue(false);

    const result = executeGuard();

    expect(result).toBeTruthy();
  });
});
