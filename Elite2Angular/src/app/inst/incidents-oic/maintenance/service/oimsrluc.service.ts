import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable()
export class OimsrlucService {
    constructor(private http: HttpService) { }

    refDmnExecuteQuery() {
        return this.http.get('oimsrluc/refDmnExcuteQuery');
    }

    refCodeExecuteQuery(obj) {
        return this.http.post('oimsrluc/refCodeExecuteQuery', obj);
    }

    refCodeCondExecuteQuery(code) {
        return this.http.post('oimsrluc/refCodeCondExecuteQuery', code);
    }

    refCodeCondCommit(obj) {
        return this.http.post('oimsrluc/refCodeCondCommit', obj);
    }
}