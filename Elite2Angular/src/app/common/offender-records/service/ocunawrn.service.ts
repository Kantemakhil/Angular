import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcunawarnService {

  constructor(private http: HttpService) { }
  /** This is description of the checkNonAssociationConflicts function*/
  checkNonAssociationConflicts(obj) {
    return this.http.post('ocunawrn/checkNonAssociationConflicts', obj);

  }
}
