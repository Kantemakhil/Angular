import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmohstaService {
    constructor(private http: HttpService) { }
    /** This is description of the comHdrStExecuteQuery function*/
    comHdrStExecuteQuery(obj) {
        return this.http.post('ocmohsta/comHdrStExecuteQuery', obj);
    }
    /** This is description of the comHdrStCommit function*/
    comHdrStCommit(obj) {
        return this.http.post('ocmohsta/comHdrStCommit', obj);
    }
}
