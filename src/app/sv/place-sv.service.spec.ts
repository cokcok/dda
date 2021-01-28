import { TestBed } from '@angular/core/testing';

import { PlaceSvService } from './place-sv.service';

describe('PlaceSvService', () => {
  let service: PlaceSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
