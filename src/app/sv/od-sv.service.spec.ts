import { TestBed } from '@angular/core/testing';

import { OdSvService } from './od-sv.service';

describe('OdSvService', () => {
  let service: OdSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
