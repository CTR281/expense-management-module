import { TestBed } from '@angular/core/testing';

import { ResolverLoadingService } from './resolver-loading.service';

describe('ResolverLoadingService', () => {
  let service: ResolverLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolverLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
