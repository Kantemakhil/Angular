import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OsunmemoService {
    constructor(private http: HttpService) {}
    /** This is description of the rgWorksRecordGroup function*/
    rgWorksRecordGroup(obj) {
        return this.http.get( 'osunmemo/rgWorksRecordGroup');
    }


     rgStaffRecordGroup(workAndObId) {
        return this.http.get( 'osunmemo/rgStaffRecordGroup?workAndObId=' + workAndObId);
    }



    getDisplayAuto(offenderBookId) {
        return this.http.get( 'osunmemo/getDisplayAuto?offenderBookId=' + offenderBookId);

    }

    rgTeamsRecordGroup(workAndObId) {

        return this.http.get( 'osunmemo/rgTeamsRecordGroup?workAndObId=' + workAndObId);

    }


    getTeamemberId(teamMemberId) {
        return this.http.get( 'osunmemo/getTeamemberId?teamMemberId=' + teamMemberId);
    }

    /** This is description of the rgSeverityRecordGroup function*/
    rgSeverityRecordGroup(obj) {
        return this.http.get( 'osunmemo/rgSeverityRecordGroup');
    }

    submitAdhocWorkflow(obj){
        return this.http.post('osunmemo/submitAdhocWorkflow', obj);
    }
}
