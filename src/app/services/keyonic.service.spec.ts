import { TestBed } from '@angular/core/testing';

import { KeyonicService } from './keyonic.service';

describe('KeyonicService', () => {
  let service: KeyonicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyonicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
