import { TestBed, inject } from '@angular/core/testing';

import { ProductCounterService } from './product-counter.service';

describe('ProductCounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCounterService]
    });
  });

  it('should be created', inject([ProductCounterService], (service: ProductCounterService) => {
    expect(service).toBeTruthy();
  }));
});
