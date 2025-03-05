import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcucnameService {
    constructor(private http: HttpService) { }
    /** This is description of the offCaseNoteExecuteQuery function*/
    offCaseNoteExecuteQuery(obj) {
        return this.http.post('ocucname/offCaseNoteExecuteQuery', obj);
    }
    /** This is description of the offCaseNoteCommit function*/
    offCaseNoteCommit(obj) {
        return this.http.post('ocucname/offCaseNoteCommit', obj);
    }
}
