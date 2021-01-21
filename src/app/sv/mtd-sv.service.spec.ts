import { TestBed } from '@angular/core/testing';

import { MtdSvService } from './mtd-sv.service';

describe('MtdSvService', () => {
  let service: MtdSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtdSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
