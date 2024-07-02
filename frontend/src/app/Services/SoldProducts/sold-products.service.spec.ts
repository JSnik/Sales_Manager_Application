import { TestBed } from '@angular/core/testing';

import { SoldProductsService } from './sold-products.service';

describe('SoldProductsServiceTsService', () => {
  let service: SoldProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
