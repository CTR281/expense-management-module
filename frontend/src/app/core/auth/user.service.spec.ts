import { TestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { User } from "./user.model";

describe("UserService", () => {
  let service: UserService;

  const mockUser: User = {
    id: "1",
    name: "Bertrand",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
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
