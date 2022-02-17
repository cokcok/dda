import { TestBed } from '@angular/core/testing';

import { RpSvService } from './rp-sv.service';

describe('RpSvService', () => {
  let service: RpSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RpSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
