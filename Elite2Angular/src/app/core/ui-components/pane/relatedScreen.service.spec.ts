import { TestBed, inject } from '@angular/core/testing';

import { RelatedScreensService } from './relatedScreens.service';

describe('RelatedScreensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatedScreensService]
    });
  });
  it('should be created', inject([RelatedScreensService], (service: RelatedScreensService) => {
    expect(service).toBeTruthy();
  }));
});
