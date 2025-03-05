import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OumhocodService {
    constructor(private http: HttpService) { }
    /** This is description of the hoCodesExecuteQuery function*/
    hoCodesExecuteQuery(obj) {
        return this.http.post('oumhocod/hoCodesExecuteQuery', obj);
    }
    /** This is description of the hoCodesCommit function*/
    hoCodesCommit(obj) {
        return this.http.post('oumhocod/hoCodesCommit', obj);
    }
    hoCodesCheckDeleteMaster(obj) {
        return this.http.post('oumhocod/hoCodesCheckDeleteMaster', obj);
    }
}
