import { TestBed } from "@angular/core/testing";

import { ExpenseRepositoryService } from "./expense-repository.service";

describe("ExpenseRepositoryService", () => {
  let service: ExpenseRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseRepositoryService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
