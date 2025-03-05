import { TestBed, inject } from '@angular/core/testing';

import { ReferenceDomainService } from './reference-domain.service';

describe('ReferenceDomainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferenceDomainService]
    });
  });

  it('should be created', inject([ReferenceDomainService], (service: ReferenceDomainService) => {
    expect(service).toBeTruthy();
  }));
});
