import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidshlogService {
   
    constructor(private http: HttpService) {}
    /** This is description of the agyShilExecuteQuery function*/
    agyShilExecuteQuery(obj) {
        return this.http.post('oidshlog/agyShilExecuteQuery', obj);
    }
    /** This is description of the agyShilCommit function*/
    agyShilCommit(obj) {
        return this.http.post('oidshlog/agyShilCommit', obj);
    }
    /** This is description of the cgfkAgyShilDspAgyLocId4RecordGroup function*/
    cgfkAgyShilDspAgyLocId4RecordGroup(caseLoadId) {
        return this.http.get( 'oidshlog/cgfkAgyShilDspAgyLocId4RecordGroup?caseloadId=' + caseLoadId);
    }
    /** This is description of the cgfkAgyShilStaffIdRecordGroup function*/
    cgfkAgyShilStaffIdRecordGroup(caseLoadId) {
        return this.http.get( 'oidshlog/cgfkAgyShilStaffIdRecordGroup?caseloadId=' + caseLoadId);
    }
    /** This is description of the cgfkAgyShilDspAgyLocId3RecordGroup function*/
    cgfkAgyShilDspAgyLocId3RecordGroup(agyLocId) {
        return this.http.get( 'oidshlog/cgfkAgyShilDspAgyLocId3RecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the cgfkAgyShilAgyActivityCodRecordGroup function*/
    cgfkAgyShilAgyActivityCodRecordGroup() {
        return this.http.get( 'oidshlog/cgfkAgyShilAgyActivityCodRecordGroup');
    }
     /** This is description of the agyShilWhenNewRecordInstance function*/
    agyShilWhenNewRecordInstance() {
          return this.http.get( 'oidshlog/agyShilWhenNewRecordInstance');
        }
     /** This is description of the agyShilWithoutLock function*/
     agyShilWithoutLock(obj) {
        return this.http.post('oidshlog/agyShilWithoutLock', obj);
    }
     /** This is description of the getBackDateHours function*/
    getBackDateHours() {
        return this.http.get( 'oidshlog/getBackDateHours');
    }
    /** This is description of the getBackDateHours function*/
    checkBoxHideData() {
        return this.http.get( 'oidshlog/checkBoxHideData');
    }
    /** This is description of the checkBoxShlogData function*/
    checkBoxShlogData() {
        return this.http.get( 'oidshlog/checkBoxShlogData');
    }

    offShiftLogExcuteQuery(internalLocationId) {
        return this.http.get('oidshlog/relatedOffendersExcuteQuery?internalLocationId=' + internalLocationId);
    }

    offShilShilCommit(obj) {
        return this.http.post('oidshlog/offShilCommit', obj);
    }

    offenderShiftLogExcuteQuery(shiftLogSeq ,internalLocationId ) {
        return this.http.get('oidshlog/OffendersShiftLogExcuteQuery?shiftLogSeq='+shiftLogSeq  + '&internalLocationId=' + internalLocationId);
    }

}
