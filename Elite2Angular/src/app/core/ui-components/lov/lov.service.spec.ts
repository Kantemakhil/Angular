import { TestBed, inject } from '@angular/core/testing';

import { LovService } from './lov.service';

describe('LovService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LovService]
    });
  });

  it('should be created', inject([LovService], (service: LovService) => {
    expect(service).toBeTruthy();
  }));
});
