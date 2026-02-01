import { TestBed } from "@angular/core/testing";

import { LoginService } from "./login-service";
import { AuthService } from "../../core/auth/auth.service";
import { User } from "../../domain/user/user.model";
import { UserRepository } from "../../domain/user/user-repository";
import { mockUser, mockUsers } from "../../../testing/user.mock";
import { EMPTY, of, throwError } from "rxjs";
import { NotificationService } from "../../core/notification/notification-service";
import { provideHttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

describe("LoginService", () => {
  let service: LoginService;
  let authService: AuthService;
  let userRepository: UserRepository;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, provideHttpClient()],
    });
    service = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthService);
    userRepository = TestBed.inject(UserRepository);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should load users", () => {
    vi.spyOn(userRepository, "getUsers").mockReturnValue(of(mockUsers));

    const action = service.loadUsers();
    expect(service.loading()).toBe(true);

    action.subscribe((result) => {
      expect(result).toEqual(mockUsers);
      expect(service.loading()).toBe(false);
    });
  });

  it("should notify when users could not be loaded", () => {
    const notificationSpy = vi.spyOn(notificationService, "error");
    vi.spyOn(userRepository, "getUsers").mockReturnValue(
      throwError(() => new Error())
    );

    service.loadUsers().subscribe((result) => expect(result).toEqual(EMPTY));

    expect(notificationSpy).toHaveBeenCalled();
  });

  it("should be able to login", () => {
    const authSpy = vi.spyOn(authService, "login");
    const routerSpy = vi.spyOn(router, "navigate");

    service.login(mockUser);

    expect(authSpy).toHaveBeenCalledWith(mockUser);
    expect(routerSpy).toHaveBeenCalledWith(["/home"]);
  });
});
