import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
@Injectable({ providedIn: 'root' })
export class OcmtidetService {
  constructor(private http: HttpService) {
   
   }
  tierdefaultEventsCommit(obj) {
    return this.http.post('ocmtidet/tierdefaultEventsCommit', obj);
  }

  tierdefaultEventsExecuteQuery(obj) {
    return this.http.post('ocmtidet/tierdefaultEventsExecuteQuery', obj);
  }
  getActiveTierEvent(obj){
    return this.http.get('ocmtidet/getActiveTierEvent?offenederBookId='+obj);
  }

}