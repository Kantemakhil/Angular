import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcucieidService {

  constructor(private http: HttpService) { }
  // checking  for insert or update or delete 
  checkForInsertOrUpdateAndDeleteExternalInvst() {
    return this.http.get('ocucieid/checkInsertUpdateDelete');
  }

  // for insert or update or delete 
  inserUpdateDeleteExternalInvst(obj) {
    return this.http.post('ocucieid/inserUpdateDeleteExternalInvst', obj);
  }

  // get All records 
  getAllExternalInvstDetails(obj) {
    return this.http.post('ocucieid/getAllExternalInvstDetails', obj);
  }

}
