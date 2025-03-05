import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OmsaljntService {
    constructor(private http: HttpService) { }
    /** This is description of the journalTableViewExecuteQuery function*/
    journalTableViewExecuteQuery(obj) {
        return this.http.post('omsaljnt/journalTableViewExecuteQuery', obj);
    }
    /** This is description of the journalTableViewCommit function*/
    journalTableViewCommit(obj) {
        return this.http.post('omsaljnt/journalTableViewCommit', obj);
    }
}
