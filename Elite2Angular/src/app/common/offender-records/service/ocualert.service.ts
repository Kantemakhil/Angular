import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OcualertService {
    constructor( private http: HttpService ) { }
    /** This is description of the alertExecuteQuery function*/
    alertExecuteQuery( obj ) {
        return this.http.post( 'ocualert/alertExecuteQuery', obj );
    }
    /** This is description of the alertExecuteQuery function*/
    rgAlertDescription(domain) {
        return this.http.get( 'ocualert/rgAlertDescription?domain=' + domain);
    }
}
