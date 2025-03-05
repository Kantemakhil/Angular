

import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class OimieplvService {

    constructor(private http: HttpService) { }

//Insert update and delete 

iepLevelCommit(obj) {
        return this.http.post('oimieplv/iepLevelCommit', obj);
    }

    // get All records 
    getAllIepRecords() {
        return this.http.get('oimieplv/getAllIepLevelCodes');
    }

    getSystemProfileValue() {
        return this.http.get('oimieplv/getSystemProfileValue');
    }
}
