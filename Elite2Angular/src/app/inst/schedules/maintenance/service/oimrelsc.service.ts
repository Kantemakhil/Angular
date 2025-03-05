import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimrelscService {
    constructor(private http: HttpService) { }
    /** This is description of the intSrExecuteQuery function*/
    retrieveGridData(obj) {
        return this.http.post('oimrelsc/retrieveGridData', obj);
    }

    saveData(data){
        return this.http.post('oimrelsc/submitFormData',data);
    }

    retrieveAlertGridData(obj) {
        return this.http.post('oimrelsc/retrieveAlertGridData', obj);
    }

    
    
}
