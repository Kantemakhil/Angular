

import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({ providedIn: 'root' })
export class OimcustsService {

    constructor(private http: HttpService) { }

    //Insert update and delete 
    custodyCommit(obj) {
        return this.http.post('oimcustas/saveCustodyData', obj);
    }

    // get All records 
    getCustodyData() {
        return this.http.get('oimcustas/getCustodyData');
    }

}
