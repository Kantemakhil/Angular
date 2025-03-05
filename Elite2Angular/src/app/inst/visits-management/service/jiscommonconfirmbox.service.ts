import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service'

@Injectable({providedIn: 'root'})
export class JiscommonconfirmboxService {
    constructor( private http: HttpService ) { }
    /** This is description of the alertExecuteQuery function*/
    getDataFromJisCommonSystem( obj,obj1,obj2 ) {
        return this.http.get( 'osiosear/getDataFromJisCommonSystem?intCorrelationId='+obj+'&nameSearchType='+obj1+'&moduleName='+obj2);
    }

    getDataFromJisCommonSystemForPerson( obj,obj1,obj2 ) {
        return this.http.get( 'osipsear/getDataFromJisCommonSystemForPerson?intCorrelationId='+obj+'&nameSearchType='+obj1+'&moduleName='+obj2);
    }
}
