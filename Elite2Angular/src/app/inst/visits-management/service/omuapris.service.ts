import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OmuaprisService {
    constructor(private http: HttpService) {}
    /** This is description of the vOffAuthVisExecuteQuery function*/
    vOffAuthVisExecuteQuery(obj) {
        return this.http.post('omuapris/vOffAuthVisExecuteQuery', obj);
    }
    /** This is description of the vOffAuthVisCommit function*/
    vOffAuthVisCommit(obj) {
        return this.http.post('omuapris/vOffAuthVisCommit', obj);
    }
      /** This is description of the vOffAuthVisExecuteQuery function*/
      getOffenderRestrcitions(vstOffIdDisplay, visitDate) {
        return this.http.get('omuapris/getOffenderRestrcitions?vstOffIdDisplay=' + vstOffIdDisplay + '&visitdDate=' + visitDate);
    }
     /** This is description of the getOffenderBookId function*/
     getOffenderBookId(vstOffIdDisplay) {
        return this.http.get('omuapris/getOffenderBookId?vstOffIdDisplay=' + vstOffIdDisplay);
    }
    
}
