import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmdprioService {
      constructor(private http: HttpService) {}
      /** This is description of the csldDpExecuteQuery function*/
      csldDpExecuteQuery(obj) {
            return this.http.post('otmdprio/csldDpExecuteQuery', obj);
      }
      /** This is description of the csldDpCommit function*/
      csldDpCommit(obj) {
            return this.http.post('otmdprio/csldDpCommit', obj);
      }
}
