import { TestBed } from "@angular/core/testing";
import { CanActivateFn } from "@angular/router";

import { canEditExpenseGuard } from "./can-edit-expense-guard";

describe("canEditExpenseGuard", () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      canEditExpenseGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });
});
