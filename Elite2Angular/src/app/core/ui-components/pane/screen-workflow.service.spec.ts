import { TestBed, inject } from '@angular/core/testing';

import { ScreenWorkFlowService } from './screen-workflow.service';

describe('ScreenWorkFlowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenWorkFlowService]
    });
  });
  it('should be created', inject([ScreenWorkFlowService], (service: ScreenWorkFlowService) => {
    expect(service).toBeTruthy();
  }));
});
