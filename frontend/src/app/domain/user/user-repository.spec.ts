import { TestBed } from "@angular/core/testing";

import { UserRepository } from "./user-repository";
import { UserHttpService } from "../../data-access/user/user-http.service";
import { UserDto } from "../../data-access/user/user.dto";
import { User } from "./user.model";
import { firstValueFrom, of } from "rxjs";
import { provideHttpClient } from "@angular/common/http";

describe("UserRepository", () => {
  let service: UserRepository;
  let httpService: UserHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(UserRepository);
    httpService = TestBed.inject(UserHttpService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get users and map them", async () => {
    const mockHttpUsers: UserDto[] = [
      {
        id: "1",
        name: "Bertrand",
      },
      { id: "2", name: "Billy" },
    ];
    const mockUsers: User[] = [
      {
        id: "1",
        fullName: "Bertrand",
      },
      { id: "2", fullName: "Billy" },
    ];
    vi.spyOn(httpService, "getUsers").mockReturnValue(of(mockHttpUsers));

    const result = await firstValueFrom(service.getUsers());

    expect(result).toEqual(mockUsers);
  });
});
