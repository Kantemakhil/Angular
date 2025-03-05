import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuintlcService {
    constructor(private http: HttpService) { }
    /** This is description of the intLocExecuteQuery function*/
    intLocExecuteQuery(obj) {
        return this.http.post('ocuintlc/intLocExecuteQuery', obj);
    }
    /** This is description of the intLocCommit function*/
    intLocCommit(obj) {
        return this.http.post('ocuintlc/intLocCommit', obj);
    }
}
