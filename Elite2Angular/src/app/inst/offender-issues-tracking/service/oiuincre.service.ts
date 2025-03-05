import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuincreService {
    constructor(private http: HttpService) { }
    /** This is description of the agencyIncidentsExecuteQuery function*/
    agencyIncidentsExecuteQuery(rootOffenderId) {
        return this.http.get('oiuincre/agencyIncidentsExecuteQuery?rootOffenderId=' + rootOffenderId);
    }
}
