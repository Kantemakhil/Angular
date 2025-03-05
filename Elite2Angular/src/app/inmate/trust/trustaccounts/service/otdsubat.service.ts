import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';

@Injectable({providedIn: 'root'})
export class OtdsubatService {
    otinamesData: VTrustHeader = new VTrustHeader();
    offenderId: number;
    constructor(private http: HttpService) {}
    /** This is description of the offTxn2ExecuteQuery function*/
    offTxn2ExecuteQuery(obj) {
        return this.http.post('otdsubat/offTxn2ExecuteQuery', obj);
    }
    /** This is description of the offTxn2Commit function*/
    offTxn2Commit(obj) {
        return this.http.post('otdsubat/offTxn2Commit', obj);
    }
    /** This is description of the offTxnExecuteQuery function*/
    offtxnExecuteQuery(obj) {
        return this.http.post('otdsubat/offTxnExecuteQuery', obj);
    }
    /** This is description of the offTxnCommit function*/
    offTxnCommit(obj) {
        return this.http.post('otdsubat/offTxnCommit', obj);
    }
    /** This is description of the cgfkOfftxn2subaccounttypeRecordGroup function*/
    cgfkOfftxn2subaccounttypeRecordGroup() {
        return this.http.get( 'otdsubat/cgfk$offTxn2SubAccountTypeRecordGroup');
    }
    /** This is description of the cgfkOfftxnsubaccounttypeRecordGroup function*/
    cgfkOfftxnsubaccounttypeRecordGroup() {
        return this.http.get( 'otdsubat/cgfk$offTxnSubAccountTypeRecordGroup');
    }
    getDescription(caseloadType, txnType) {
        return this.http.get( 'otdsubat/getDescription?caseloadType=' + caseloadType + '&txnType=' + txnType);
    }
    getacCode(code, caseloadType) {
        return this.http.get( 'otdsubat/getacCode?code=' + code + '&caseloadType=' + caseloadType);
    }
    getBal(offenderId, caseloadId, acCode) {
        return this.http.get( 'otdsubat/getBal?offenderId=' + offenderId + '&caseloadId=' + caseloadId + '&acCode=' + acCode);
    }
    checkAcntClose(offenderId, caseloadId) {
        return this.http.get( 'otdsubat/checkAcntClose?offenderId=' + offenderId + '&caseloadId=' + caseloadId );

    }
}
