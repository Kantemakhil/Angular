import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable({providedIn: 'root'})
export class OidreleaService {
    namesearch: any;
    imagesDataTemp = new Images();
    constructor( private http: HttpService ) { }
    /** This is description of the offEmExecuteQuery function*/
    offEmExecuteQuery( obj ) {
        return this.http.post( 'oidrelea/offEmExecuteQuery', obj );
    }
    /** This is description of the offEmCommit function*/
    offEmCommit( obj ) {
        return this.http.post( 'oidrelea/offEmCommit', obj );
    }
    /** This is description of the offEmCommit function*/
    offBookingCommit( obj ) {
        return this.http.post( 'oidrelea/offBookingCommit', obj );
    }

    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery( obj ) {
        return this.http.post( 'oidrelea/sysPflExecuteQuery', obj );
    }
    /** This is description of the cgfkOffemmovementreasoncoRecordGroup function*/
    cgfkOffemmovementreasoncoRecordGroup() {
        return this.http.get( 'oidrelea/cgfkOffEmMovementReasonCoRecordGroup' );
    }
    /** This is description of the rgMovementReasonCodeRecordGroup function*/
    rgMovementReasonCodeRecordGroup() {
        return this.http.get( 'oidrelea/rgMovementReasonCodeRecordGroup' );
    }
    /** This is description of the offEmPreInsertc function*/
    offEmPreInsertc() {
        return this.http.get( 'oidrelea/offempreinsertc' );

        // tslint:disable-next-line:indent
    }
    /** This is description of the omsMovementsCheckActiveSentence function*/
    omsMovementsCheckActiveSentence( obj ) {
        return this.http.post( 'oidrelea/omsMovementsCheckActiveSentence', obj );
    }
    /** This is description of the omsMovementsCheckActiveCases function*/
    omsMovementsCheckActiveCases( obj ) {
        return this.http.post( 'oidrelea/omsMovementsCheckActiveCases', obj );
    }
    /** This is description of the offEmCommit function*/
    offBkgCommit( obj ) {
        return this.http.post( 'oidrelea/offBkgCommit', obj );
    }
    /** This is description of the movementDateComparison function*/
    movementDateComparison( offenderBookId ) {
        return this.http.get( 'oidrelea/movementDateComparison?offenderBookId=' + offenderBookId);
    }
    /** This is description of the gettingProfileValue function*/
    gettingProfileValue() {
        return this.http.get('oidrelea/gettingProfileValue');
    }
    /** This is description of the getClosedFlag function*/
    getClosedFlag( movementCode ) {
        return this.http.get( 'oidrelea/getClosedFlag?movementCode=' + movementCode);
    }

    getOffenderCommentText( offenderBookId ) {
        return this.http.get( 'oidrelea/getoffendercommenttext?offenderBookId=' + offenderBookId);
    }
    updateCommentText(obj) {
        return this.http.post('oidrelea/updatecommenttext', obj);
    }
    getOffreleaseSchedule(offenderBookId) {
        return this.http.get('oidrelea/getOffenderreleaseSchedule?offenderBookId=' + offenderBookId);
    }
}
