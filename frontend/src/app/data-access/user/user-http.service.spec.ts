import { TestBed } from "@angular/core/testing";

import { UserHttpService } from "./user-http.service";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { UserDto } from "./user.dto";

describe("UserHttp", () => {
  let userHttpService: UserHttpService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    userHttpService = TestBed.inject(UserHttpService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(userHttpService).toBeTruthy();
  });

  it("should GET /users", () => {
    const mockUsers: UserDto[] = [
      { id: "1", name: "Bertrand" },
      { id: "2", name: "Billy" },
    ];
    userHttpService
      .getUsers()
      .subscribe((users) => expect(users).toEqual(mockUsers));

    const req = httpClient.expectOne("/users");

    expect(req.request.method).toBe("GET");
    req.flush(mockUsers);
  });
});
