import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimprfcaService {
    constructor(private http: HttpService) { }
    /** This is description of the pflCatExecuteQuery function*/
    pflCatExecuteQuery(obj) {
        return this.http.post('oimprfca/pflCatExecuteQuery', obj);
    }
    /** This is description of the pflCatCommit function*/
    pflCatCommit(obj) {
        return this.http.post('oimprfca/pflCatCommit', obj);
    }
    /** This is description of the pflTypeExecuteQuery function*/
    pflTypeExecuteQuery(obj) {
        return this.http.post('oimprfca/pflTypeExecuteQuery', obj);
    }
    /** This is description of the pflTypeCommit function*/
    pflTypeCommit(obj) {
        return this.http.post('oimprfca/pflTypeCommit', obj);
    }
}
