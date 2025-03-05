import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuincrpService {
    constructor(private http: HttpService) {}
    /** This is description of the agyIncExecuteQuery function*/
    agyincExecuteQuery(obj) {
        return this.http.post('oiuincrp/agyIncExecuteQuery', obj);
    }
}
