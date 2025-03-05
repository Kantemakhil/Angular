import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class OmuclassService {
    constructor( private http: HttpService ) { }
    /** This is description of the subTotalsExecuteQuery function*/
    subTotalsExecuteQuery( obj ) {
        return this.http.post( 'omuclass/subTotalsExecuteQuery', obj );
    }
}
