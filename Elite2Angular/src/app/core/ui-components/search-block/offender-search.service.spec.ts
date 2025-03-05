import { TestBed, inject } from '@angular/core/testing';

import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

describe('OffenderSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffenderSearchService]
    });
  });

  it('should be created', inject([OffenderSearchService], (service: OffenderSearchService) => {
    expect(service).toBeTruthy();
  }));
});
