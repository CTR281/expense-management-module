import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureExpense } from './feature-expense';

describe('FeatureExpense', () => {
  let component: FeatureExpense;
  let fixture: ComponentFixture<FeatureExpense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureExpense],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureExpense);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
