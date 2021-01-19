import { TestBed } from '@angular/core/testing';

import { SysmenuSvService } from './sysmenu-sv.service';

describe('SysmenuSvService', () => {
  let service: SysmenuSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysmenuSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
