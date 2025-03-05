import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmctoffService {
    constructor(private http: HttpService) { }
    /** This is description of the crPrfGdExecuteQuery function*/
    crPrfGdExecuteQuery(obj) {
        return this.http.post('ocmctoff/crPrfGdExecuteQuery', obj);
    }
    /** This is description of the crPrfGdCommit function*/
    crPrfGdCommit(obj) {
        return this.http.post('ocmctoff/crPrfGdCommit', obj);
    }
}
