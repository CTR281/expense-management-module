import { TestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { UserHttpService } from "../data-access/user-http.service";
import { firstValueFrom, of } from "rxjs";
import { provideHttpClient } from "@angular/common/http";
import { mockUsers } from "../../../../testing/user.mock";
import { mockUsersDto } from "../../../../testing/user-dto.mock";

describe("UserService", () => {
  let service: UserService;
  let httpService: UserHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(UserService);
    httpService = TestBed.inject(UserHttpService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get users and map them", async () => {
    vi.spyOn(httpService, "getUsers").mockReturnValue(of(mockUsersDto));

    const result = await firstValueFrom(service.getUsers());

    expect(result).toEqual(mockUsers);
  });
});
