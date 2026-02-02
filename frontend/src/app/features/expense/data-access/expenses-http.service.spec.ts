import { TestBed } from '@angular/core/testing';

import { ExpensesHttpService } from './expenses-http.service';

describe('ExpensesHttpService', () => {
  let service: ExpensesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
