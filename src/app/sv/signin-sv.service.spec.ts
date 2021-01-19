import { TestBed } from '@angular/core/testing';

import { SigninSvService } from './signin-sv.service';

describe('SigninSvService', () => {
  let service: SigninSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
