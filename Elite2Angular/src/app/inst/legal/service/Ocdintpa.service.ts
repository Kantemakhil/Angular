import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcdintpaService {

  constructor(private http: HttpService) { }

  executeQuery(interestedParty) {
    return this.http.post('ocdintpa/executeQuery', interestedParty);
  }

  commitData(commitBean) {
    return this.http.post('ocdintpa/commitData', commitBean);
  }

}
