import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OsureporService {
    constructor(private http: HttpService) { }
    /** This is description of the rg1cRecordGroup function*/
    rg1cRecordGroup(obj) {
        return this.http.get('osurepor/rg1cRecordGroup');
    }
    /** This is description of the rg2cRecordGroup function*/
    rg2cRecordGroup(obj) {
        return this.http.get('osurepor/rg2cRecordGroup');
    }
    /** This is description of the rg3cRecordGroup function*/
    rg3cRecordGroup(obj) {
        return this.http.get('osurepor/rg3cRecordGroup');
    }
    /** This is description of the rg4cRecordGroup function*/
    rg4cRecordGroup(obj) {
        return this.http.get('osurepor/rg4cRecordGroup');
    }
    /** This is description of the rg5cRecordGroup function*/
    rg5cRecordGroup(obj) {
        return this.http.get('osurepor/rg5cRecordGroup');
    }
    /** This is description of the rg5c1RecordGroup function*/
    rg5c1RecordGroup(obj) {
        return this.http.get('osurepor/rg5c1RecordGroup');
    }
    /** This is description of the rgOutputTypeRecordGroup function*/
    rgOutputTypeRecordGroup(obj) {
        return this.http.get('osurepor/rgOutputTypeRecordGroup');
    }
    /** This is description of the rgPrinterRecordGroup function*/
    rgPrinterRecordGroup(obj) {
        return this.http.get('osurepor/rgPrinterRecordGroup');
    }
    /** This is description of the rgPrinterRecordGroup function*/
    populateRecords(obj) {
        return this.http.post('osurepor/populateRecords', obj);
    }
    getReport (caseloadId, datetoLong, flag) {
        return this.http.get('osurepor/getReport?caseloadId=' + caseloadId + '&datetoLong=' + datetoLong + '&flag=' + flag);
    }
    getBankReconciliationReport (accountCode, userDate , caseloadId) {
        return this.http.get('osurepor/getBankReconciliationReport?accountCode=' + accountCode + '&userDate=' + userDate
         + '&caseloadId=' + caseloadId);

    }
    
    /** This is description of the receiptNumExist function*/
    getReportOtrbstat(obj) {
        return this.http.post( 'osurepor/getReportOtrbstat', obj);
    }
    /** This is description of the receiptNumExist function*/
    getLovOtrbstat(obj,caseloadId) {
        return this.http.get('osurepor/getLovOtrbstat?parameterName=' + obj+ '&caseloadId=' + caseloadId);
    }

}
