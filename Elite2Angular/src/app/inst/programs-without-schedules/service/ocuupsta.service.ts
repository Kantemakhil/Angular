import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuupstaService {
    constructor(private http: HttpService) { }
    /** This is description of the offPrgOblHtyExecuteQuery function*/
    offPrgOblHtyExecuteQuery(obj) {
        return this.http.post('ocuupsta/offPrgOblHtyExecuteQuery', obj);
    }
    /** This is description of the rgPsPrgStatRecordGroup function*/
    rgPsPrgStatRecordGroup() {
        return this.http.get('ocuupsta/rgPsPrgStatRecordGroup');
    }
    /** This is description of the rgPsPrgObstsRecordGroup function*/
    rgPsPrgObstsRecordGroup(parentCode) {
        return this.http.get('ocuupsta/rgPsPrgObstsRecordGroup?parentCode=' + parentCode);
    }
    updateStatus(obj) {
        return this.http.post('ocuupsta/updateStatus', obj);
    }
    getRefferalDate(offenderPrgObligationId) {
        return this.http.get('ocuupsta/getRefferaldate?offenderPrgObligationId=' + offenderPrgObligationId);
    }
    getMaxDate(offenderPrgObligationId) {
        return this.http.get('ocuupsta/getMaxDate?offenderPrgObligationId=' + offenderPrgObligationId);
    }

    updateStatusBtn(code){
		return this.http.get('ocuupsta/updateStatusBtn?code='+code);
	}

    getAdministratorUserAccsess(){
		return this.http.get('ocuupsta/getAdministratorUserAccsess');
	}

    reasonForSuspendingOrEndingProgramDisable(code){
		return this.http.get('ocuupsta/reasonForSuspendingOrEndingProgramDisable?code='+code);
	}

    refCodeExecuteQuery(obj) {
        return this.http.post('ocuupsta/refCodeExecuteQuery', obj);
    }
}
