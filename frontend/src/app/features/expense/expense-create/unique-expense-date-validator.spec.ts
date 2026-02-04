import { TestBed } from "@angular/core/testing";

import { UniqueExpenseDateValidator } from "./unique-expense-date-validator.service";

describe("UniqueExpenseDateValidator", () => {
  let service: UniqueExpenseDateValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueExpenseDateValidator);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
