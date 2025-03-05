import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class IntakeService {

  constructor(private http: HttpService) { }



  getOffenderIntakeSummary(caseLoadId: string) {
      return this.http.get('workspace/InmateSummary?caseLoadId=' + caseLoadId);
  }




}
