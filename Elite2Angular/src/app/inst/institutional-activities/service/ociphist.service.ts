import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OciphistService {
    programId: number;
    constructor(private http: HttpService) { }
    /** This is description of the prgPayBatchesExecuteQuery function*/
    prgPayBatchesExecuteQuery(obj) {
        return this.http.post('ociphist/prgPayBatchesExecuteQuery', obj);
    }
    payDetailsExecuteQuery(obj) {
        return this.http.post('ociphist/payDetailsExecuteQuery', obj);
    }
}
