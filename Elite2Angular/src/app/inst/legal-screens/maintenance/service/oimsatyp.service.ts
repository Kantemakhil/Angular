import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimsatypService {
    constructor(private http: HttpService) {}
    /** This is description of the sentenceAdjustmentsExecuteQuery function*/
    sentenceAdjustmentsExecuteQuery(obj) {
        return this.http.post('oimsatyp/sentence_adjustmentsExecuteQuery',obj);
    }
    /** This is description of the sentenceAdjustmentsCommit function*/
    sentenceAdjustmentsCommit(obj) {
        return this.http.post('oimsatyp/sentence_adjustmentsCommit',obj);
    }
    /** This is description of the cgfkSentenceAdjustmentsDspRecordGroup function*/
    cgfkSentenceAdjustmentsDspRecordGroup() {
        return this.http.get( 'oimsatyp/cgfk$sentence_adjustments_dsp_RecordGroup');
    }
    /** This is description of the cgfkSentenceAdjustmentsUsagRecordGroup function*/
    cgfkSentenceAdjustmentsUsagRecordGroup() {
        return this.http.get( 'oimsatyp/cgfk$sentence_adjustments_usagRecordGroup');
    }
}
