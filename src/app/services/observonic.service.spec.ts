import { TestBed } from '@angular/core/testing';

import { ObservonicService } from './observonic.service';

describe('ObservonicService', () => {
  let service: ObservonicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservonicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
