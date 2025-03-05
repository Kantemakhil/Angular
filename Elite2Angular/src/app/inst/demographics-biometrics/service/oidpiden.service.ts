import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidpidenService {
    constructor(private http: HttpService) {}
    /** This is description of the offPaExecuteQuery function*/
    offPaExecuteQuery(obj) {
        return this.http.post('oidpiden/offPaExecuteQuery',obj);
    }
    /** This is description of the offPaCommit function*/
    offPaCommit(obj) {
        return this.http.post('oidpiden/offPaCommit',obj);
    }
    /** This is description of the offRaceExecuteQuery function*/
    offRaceExecuteQuery(obj) {
        return this.http.post('oidpiden/offRaceExecuteQuery',obj);
    }
    /** This is description of the offRaceCommit function*/
    offRaceCommit(obj) {
        return this.http.post('oidpiden/offRaceCommit',obj);
    }
    /** This is description of the offPdExecuteQuery function*/
    offPdExecuteQuery(obj) {
        return this.http.post('oidpiden/offPdExecuteQuery',obj);
    }
    /** This is description of the offPdCommit function*/
    offPdCommit(obj) {
        return this.http.post('oidpiden/offPdCommit',obj);
    }
    /** This is description of the offImExecuteQuery function*/
    offImExecuteQuery(obj, imageObjType) {
        return this.http.post('oidpiden/offImExecuteQuery?imageObjType=' + imageObjType , obj);
    }
    /** This is description of the offImCommit function*/
    offImCommit(obj) {
        return this.http.post('oidpiden/offImCommit',obj);
    }
    /** This is description of the rgProfileRecordGroup function*/
    rgProfileRecordGroup(obj) {
        return this.http.get( 'oidpiden/rgProfileRecordGroup?profileType='+obj);
    }
    /** This is description of the rgMarkTypeRecordGroup function*/
    rgMarkTypeRecordGroup() {
        return this.http.get( 'oidpiden/rgMarkTypeRecordGroup');
        // .toPromise()
        // .then(response => {return <any[]> response['_body'] ;
        // });
    }
    /** This is description of the rgBodyPartRecordGroup function*/
    rgBodyPartRecordGroup(obj) {
        return this.http.get( 'oidpidenRgBodyPartRecordGroup').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the rgSideRecordGroup function*/
    rgSideRecordGroup(obj) {
        return this.http.get( 'oidpidenRgSideRecordGroup').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the rgPartOrientRecordGroup function*/
    rgPartOrientRecordGroup(obj) {
        return this.http.get( 'oidpidenRgPartOrientRecordGroup').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the rgRaceCodeRecordGroup function*/
    rgRaceCodeRecordGroup() {
        return this.http.get( 'oidpiden/rgRaceCodeRecordGroup');
    }
    /** This is description of the offBkgPreDelete function*/
    offBkgPreDelete(obj) {
        return this.http.get( 'oidpidenOffbkgpredelete').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the nbtDetailDescWhenValidateItemprofile_types_c function*/
    nbtDetailDescWhenValidateItemprofile_types_c(obj) {
        return this.http.get( 'oidpidenNbtdetaildescwhenvalidateitemprofileTypes').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the nbtDetailDescWhenNewItemInstanceprofile_types_c function*/
    nbtDetailDescWhenNewItemInstanceprofile_types_c(obj) {
        return this.http.get( 'oidpidenNbtdetaildescwhennewiteminstanceprofileTypes').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the offPdWhenNewRecordInstanceprofile_types_c function*/
    offPdWhenNewRecordInstanceprofile_types_c(obj) {
        return this.http.get( 'oidpidenOffpdwhennewrecordinstanceprofileTypes').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the offPdPostQuerychar_desc_cur function*/
    offPdPostQuerychar_desc_cur(obj) {
        return this.http.get( 'oidpidenOffpdpostquerycharDescCur').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the callToShowFingerprintOld function*/
    callToShowFingerprintOld(obj) {
        return this.http.post('oidpidenCalltoshowfingerprintold',obj).toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the cgfkchkOffPdOffPdPflCodvalueTypeCur function*/
    cgfkchkOffPdOffPdPflCodvalueTypeCur(obj) {
        return this.http.get( 'oidpidenCgfkchkoffpdoffpdpflcodvaluetypecur').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }
    /** This is description of the cgfkchkOffPdOffPdPflCodc function*/
    cgfkchkOffPdOffPdPflCodc(obj) {
        return this.http.get( 'oidpidenCgfkchkoffpdoffpdpflcodc').toPromise()
        .then(response => {return <any[]> response['_body'] ;
        });
    }

    checkImage(imageObjType, offenderBookId , markType, bodypart , objectSeq) {
        return this.http.get('/oidpiden/checkImage?imageObjType=' + imageObjType + '&offenderBookId=' + offenderBookId
                            + '&markType=' + markType  + '&bodypart=' + bodypart
                            + '&objectSeq=' + objectSeq);
    }
    checkProfileDetails(offenderBookId , caseloadType, profileCategory) {
        return this.http.get('/oidpiden/checkProfileDetails?offenderBookId=' + offenderBookId + '&caseloadType=' + caseloadType
                            + '&profileCategory=' + profileCategory);
    }
}
