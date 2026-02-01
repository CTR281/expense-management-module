import { TestBed } from "@angular/core/testing";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

import { authGuard } from "./auth-guard";
import { AuthService } from "./auth.service";

describe("authGuard", () => {
  const executeGuard = () =>
    TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
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

  it("should redirect to login if the user is not logged in", () => {
    vi.spyOn(authService, "isLoggedIn").mockReturnValue(false);

    const result = executeGuard();

    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toEqual("/login");
  });

  it("should allow navigation if the user is logged in", () => {
    vi.spyOn(authService, "isLoggedIn").mockReturnValue(true);

    const result = executeGuard();

    expect(result).toBeTruthy();
  });
});
