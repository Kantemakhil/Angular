import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuavlocService {
    constructor(private http: HttpService) {}
    /** This is description of the avlLocExecuteQuery function*/
    avlLocExecuteQuery(obj) {
        return this.http.post('ocuavloc/avlLocExecuteQuery', obj);
    }
    /** This is description of the fboLocExecuteQuery function*/
    fboLocExecuteQuery(obj) {
        return this.http.post('ocuavloc/fboLocExecuteQuery', obj);
    }
      /** This is description of the getOcuavlocAvailable function*/
      getOcuavlocAvailable(obj) {
        return this.http.post('ocuavloc/getOcuavlocAvailable', obj);
    }
     /** This is description of the getOcuavlocUnAvailable function*/
     getOcuavlocUnAvailable(obj) {
        return this.http.post('ocuavloc/getOcuavlocUnAvailable', obj);
    }
    /** This is description of the reCheckTimeSlot function*/
    reCheckTimeSlot(obj) {
        return this.http.post('ocuavloc/reCheckTimeSlot', obj);
    }
}
