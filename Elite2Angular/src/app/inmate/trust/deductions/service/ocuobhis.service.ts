import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuobhisService {
    constructor(private http: HttpService) {}
    /** This is description of the offOblHtyExecuteQuery function*/
    offOblHtyExecuteQuery(obj) {
        return this.http.post('ocuobhis/offOblHtyExecuteQuery', obj);
    }
     /** This is description of the whenNewFormInstance function*/
    whenNewFormInstance(obj) {
        return this.http.post('ocuobhis/whenNewFormInstance', obj);
    }
    
}
