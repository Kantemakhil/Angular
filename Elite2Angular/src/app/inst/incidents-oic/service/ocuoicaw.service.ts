import { Injectable } from '@angular/core';

import { OffenderOicSanctions } from '@instoicbeans/OffenderOicSanctions';
import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcuoicawService {
          oicsancDataTemp: OffenderOicSanctions[] = [];
    offBookID: any;
      constructor(private http: HttpService) { }
    /** This is description of the oicSancExecuteQuery function*/
    oicSancExecuteQuery(obj) {
        return this.http.post('ocuoicaw/oicSancExecuteQuery', obj);
    }
    /** This is description of the oicSancCommit function*/
    oicSancCommit(obj) {
        return this.http.post('ocuoicaw/oicSancCommit', obj);
    }
    /** This is description of the rgOtherSanctionsRecordGroup function*/
    rgOtherSanctionsRecordGroup(obj) {
        return this.http.post('ocuoicaw/rgOtherSanctionsRecordGroup', obj);
    }
    /** This is description of the rgSanctRecordGroup function*/
    rgSanctRecordGroup() {
        return this.http.get('ocuoicaw/rgSanctRecordGroup');
    }
    /** This is description of the rgSanctStRecordGroup function*/
    rgSanctStRecordGroup() {
        return this.http.get('ocuoicaw/rgSanctStRecordGroup');
    }
    /** This is description of the ocuoicawWhenValidateItemget_oic_offence_code_cur function*/
    ocuoicawWhenValidateItemget_oic_offence_code_cur(obj) {
        return this.http.post('ocuoicaw/whenvalidateitemgetoicoffencecodecur', obj);
    }
    /** This is description of the getProfileValue2vsProfvalCur function*/
    getProfileValue2vsProfvalCur(obj) {
        return this.http.post('ocuoicaw/getprofilevaluevsprofvalcur', obj);
    }
    getHearingType(obj) {
        return this.http.post('ocuoicaw/getHearingType', obj);
    }
}
