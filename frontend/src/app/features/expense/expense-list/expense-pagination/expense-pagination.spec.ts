import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePagination } from './expense-pagination';

describe('ExpensePagination', () => {
  let component: ExpensePagination;
  let fixture: ComponentFixture<ExpensePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensePagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensePagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
