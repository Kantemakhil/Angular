import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcutasatService {
       constructor(private http: HttpService) { }
       /** This is description of the teamsExecuteQuery function*/
       teamsExecuteQuery(obj) {
              return this.http.post('ocutasat/teamsExecuteQuery', obj);
       }
       /** This is description of the rgAreaTypeRecordGroup function*/
       rgAreaTypeRecordGroup() {
              return this.http.get('ocutasat/rgAreaTypeRecordGroup');
       }
       /** This is description of the rgAreaRecordGroup function*/
       rgAreaRecordGroup() {
              return this.http.get('ocutasat/rgAreaRecordGroup');
       }
}
