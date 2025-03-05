import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuprresService {
    constructor(private http: HttpService) { }
    /** This is description of the prresExecuteQuery function*/
    prresExecuteQuery(obj) {
        return this.http.post('oiuprres/prresExecuteQuery', obj);
    }
    /** This is description of the prresCommit function*/
    prresCommit(obj) {
        return this.http.post('oiuprres/prresCommit', obj);
    }
}
