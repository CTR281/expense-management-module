import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { User } from "../../domain/user/user.model";

describe("AuthService", () => {
  let service: AuthService;

  const mockUser: User = {
    id: "1",
    fullName: "Bertrand",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should start logged out", () => {
    expect(service.user()).toBeNull();
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it("should log in the user", () => {
    service.login(mockUser);

    expect(service.user()).toEqual(mockUser);
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it("should log out the user", () => {
    service.login(mockUser);
    service.logout();

    expect(service.user()).toBeNull();
    expect(service.isLoggedIn()).toBeFalsy();
  });
});
