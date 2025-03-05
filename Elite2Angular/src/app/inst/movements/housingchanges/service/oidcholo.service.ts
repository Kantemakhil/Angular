import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidcholoService {
    constructor(private http: HttpService) { }
    /** This is description of the crtMvTmpExecuteQuery function*/
    crtMvTmpExecuteQuery(obj) {
        return this.http.post('oidcholo/crtMvTmpExecuteQuery', obj);
    }
    /** This is description of the crtMvTmpCommit function*/
    crtMvTmpCommit(obj) {
        return this.http.post('oidcholo/crtMvTmpCommit', obj);
    }
    /** This is description of the cgfkCrtmvtmpmovementreasoRecordGroup function*/
    cgfkCrtmvtmpmovementreasoRecordGroup(obj) {
        return this.http.get('oidcholo/cgfk$crtMvTmpMovementReasoRecordGroup');
    }
    /** This is description of the cgfkBedahdspdescriptionRecordGroup function*/
    cgfkBedahdspdescriptionRecordGroup(obj) {
        return this.http.get('oidcholo/cgfk$bedAhDspDescriptionRecordGroup');
    }
    /** This is description of the cgfkBedahdspoffenderiddiRecordGroup function*/
    cgfkBedahdspoffenderiddiRecordGroup(obj) {
        return this.http.get('oidcholo/cgfk$bedAhDspOffenderIdDiRecordGroup');
    }
    /** This is description of the cgfkCrtmvtmpdspliving4RecordGroup function*/
    cgfkCrtmvtmpdspliving4RecordGroup(obj) {
        return this.http.get('oidcholo/cgfkCrtMvTmpDspLiving4RecordGroup?agyLocId=' + obj);
    }
    /** This is description of the cgfkCrtmvtmpdspliving3RecordGroup function*/
    cgfkCrtmvtmpdspliving3RecordGroup(agyLocId, livingUnitId) {
        return this.http.get('oidcholo/cgfkCrtMvTmpDspLiving3RecordGroup?agyLocId=' + agyLocId + '&livingUnitId=' + livingUnitId);
    }
    /** This is description of the cgfkCrtmvtmpdspliving2RecordGroup function*/
    cgfkCrtmvtmpdspliving2RecordGroup(obj) {
        return this.http.get('oidcholo/cgfk$crtMvTmpDspLiving2RecordGroup');
    }
    /** This is description of the cgfkCrtmvtmpdsplivinguniRecordGroup function*/
    cgfkCrtmvtmpdsplivinguniRecordGroup(obj) {
        return this.http.get('oidcholo/cgfk$crtMvTmpDspLivingUniRecordGroup');
    }
    /** This is description of the cgfkCrtmvtmpagylocidRecordGroup function*/
    cgfkCrtmvtmpagylocidRecordGroup(obj) {
        return this.http.get('oidcholo/cgfk$crtMvTmpAgyLocIdRecordGroup');
    }

    oidcholoCgfklkpBedAhBedDatetimeProc(livingUnitId: number, OffenderBookingId: number) {
        return this.http.get('oidcholo/oidcholoCgfklkpBedAhBedDatetimeProc?livingUnitId=' + livingUnitId +
         '&offenderBookId=' + OffenderBookingId);
    }

    checkNonIndGangConficts(obj){
        return this.http.post('oidcholo/checkNonIndGangConficts', obj);
    }
}
