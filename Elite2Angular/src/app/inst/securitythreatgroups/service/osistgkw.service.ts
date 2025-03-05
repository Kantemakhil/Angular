import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OsistgkwService {
     constructor(private http: HttpService) { }
     /** This is description of the stgSearchV1ExecuteQuery function*/
     stgSearchV1ExecuteQuery(obj) {
          return this.http.post('osistgkw/stgSearchV1ExecuteQuery', obj);
     }
     /** This is description of the stgSearchV1Commit function*/
     stgSearchV1Commit(obj) {
          return this.http.post('osistgkw/stgSearchV1Commit', obj);
     }
     /** This is description of the rgIdentifiersRecordGroup function*/
     rgIdentifiersRecordGroup(obj) {
          return this.http.get('osistgkw/rgIdentifiersRecordGroup', obj);
     }
}
