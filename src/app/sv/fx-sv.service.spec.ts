import { TestBed } from '@angular/core/testing';

import { FxSvService } from './fx-sv.service';

describe('FxSvService', () => {
  let service: FxSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
