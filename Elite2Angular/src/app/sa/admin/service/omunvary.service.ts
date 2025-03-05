import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OmunvaryService {
    constructor(private http: HttpService) {}
    /** This is description of the nameSynonymsExecuteQuery function*/
    nameSynonymsExecuteQuery(obj) {
        return this.http.post('omunvary/nameSynonymsExecuteQuery', obj);
    }
    /** This is description of the nameSynonymsCommit function*/
    nameSynonymsCommit(obj) {
        return this.http.post('omunvary/nameSynonymsCommit', obj);
    }
}
