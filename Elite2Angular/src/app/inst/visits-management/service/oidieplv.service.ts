import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';


@Injectable({providedIn: 'root'})
export class OidieplvService {

    constructor(private http: HttpService) { }

    getIEPLov(){
        return this.http.get('oidieplv/getIEPLOvs');
    }
	getStaffId() {
		return this.http.get('oidieplv/lvLoginUserStaffId');
	}

    insertOffenderIep(obj){
        return this.http.post('oidieplv/saveData', obj);
    }

    getAllIepRecords(offenderBookId) {
        return this.http.get('oidieplv/getAllData?offenderBookId=' + offenderBookId);
    }
    getReviewDaysForIepLevelCode(){
        return this.http.get('oidieplv/getReviewDaysForIepLevelCode');
    }
}