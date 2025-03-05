import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmxpstmService {
constructor(private http: HttpService) {}

    refDmnExecuteQuery(obj) {
        return this.http.post('ocmxpstm/refDmnExecuteQuery', obj);
    }

    refCodeExecuteQuery(obj) {
        return this.http.post('ocmxpstm/refCodeExecuteQuery', obj);
    }

    refCodeCondExecuteQuery(code){
        return this.http.post('ocmxpstm/refCodeCondExecuteQuery', code);
    }

    refCodeCondCommit(obj) {
        return this.http.post('ocmxpstm/refCodeCondCommit', obj);
    }
}
