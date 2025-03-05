import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
import { OffenderOicSanctions } from '@instoicbeans/OffenderOicSanctions';
@Injectable({providedIn: 'root'})
export class OcuoicheService {
    hearingdate: any[];
    hearingdata: any;
    data: OffenderOicSanctions = new OffenderOicSanctions();
    offenderBookId: any;
    partySeq: any;
    constructor( private http: HttpService ) { }
    /** This is description of the oicHearExecuteQuery function*/
    oicHearExecuteQuery( obj ) {
        return this.http.post( 'ocuoiche/oicHearExecuteQuery', obj );
    }
    /** This is description of the oicHearCommit function*/
    oicHearCommit( obj ) {
        return this.http.post( 'ocuoiche/oicHearCommit', obj );
    }
    /** This is description of the oicHearResExecuteQuery function*/
    oicHearResExecuteQuery( obj ) {
        return this.http.post( 'ocuoiche/oicHearResExecuteQuery', obj );
    }
    /** This is description of the oicHearResCommit function*/
    oicHearResCommit( obj ) {
        return this.http.post( 'ocuoiche/oicHearResCommit', obj );
    }
    /** This is description of the rgOffenceCodeRecordGroup function*/
    rgOffenceCodeRecordGroup( obj ) {
        return this.http.get( 'ocuoicheRgOffenceCodeRecordGroup' );
    }
    /** This is description of the rgAgyIncpStaffIdRecordGroup function*/
    rgAgyIncpStaffIdRecordGroup( obj ) {
        return this.http.post( 'ocuoiche/rgAgyIncpStaffIdRecordGroup', obj);
    }
    /** This is description of the rgHearingTypeRecordGroup function*/
    rgHearingTypeRecordGroup( obj ) {
        return this.http.get( 'ocuoicheRgHearingTypeRecordGroup' );
    }
    /** This is description of the rgInternalLocationsRecordGroup function*/
    rgInternalLocationsRecordGroup( caseLoadId ) {
        return this.http.get( 'ocuoiche/rgInternalLocationsRecordGroup?caseloadId=' + caseLoadId );
    }
    /** This is description of the rgIncidentChargesRecordGroup function*/
    rgIncidentChargesRecordGroup(obj) {
        return this.http.post( 'ocuoiche/rgIncidentChargesRecordGroup',obj );
    }
    /** This is description of the rgFindingRecordGroup function*/
    rgFindingRecordGroup() {
        return this.http.get( 'ocuoiche/rgFindingRecordGroup' );
    }
    /** This is description of the rgPleaRecordGroup function*/
    rgPleaRecordGroup() {
        return this.http.get( 'ocuoiche/rgPleaRecordGroup' );
    }
    /** This is description of the oicHearPreQuery function*/
    oicHearPreQuery( obj ) {
        return this.http.get( 'ocuoicheFmb.xmlOichearprequery' );
    }
    /** This is description of the oicHearOnCheckDeleteMasteroic_hear_res_cur function*/
    oicHearOnCheckDeleteMasteroic_hear_res_cur( obj ) {
        return this.http.get( 'ocuoicheOichearoncheckdeletemasteroicHearResCur' );
    }
    /** This is description of the ocuoicheKeyDelrecoic_sanc_cur function*/
    ocuoicheKeyDelrecoic_sanc_cur( obj ) {
        return this.http.get( 'ocuoicheOcuoichekeydelrecoicSancCur' );
    }
    /** This is description of the ocuoicheKeyDelrec function*/
    ocuoicheKeyDelrec( obj ) {
        return this.http.get( 'ocuoicheOcuoichekeydelrec' );
    }
    /** This is description of the oicSancExecuteQuery function*/
    oicSancExecuteQuery(obj) {
        return this.http.post('ocuoicaw/oicSancExecuteQuery', obj);
    }
}
