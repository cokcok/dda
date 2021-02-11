import { TestBed } from '@angular/core/testing';

import { PoSvService } from './po-sv.service';

describe('PoSvService', () => {
  let service: PoSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
