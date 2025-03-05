import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable({providedIn: 'root'})
export class OumpersoService {
	imagesDataTemp = new Images();
    constructor(private http: HttpService) { }
    /** This is description of the staffExecuteQuery function*/
    staffExecuteQuery(obj) {
        return this.http.post('oumperso/staffExecuteQuery', obj);
    }
    /** This is description of the staffCommit function*/
    staffCommit(obj) {
        return this.http.post('oumperso/staffCommit', obj);
    }
    /** This is description of the imageExecuteQuery function*/
    imageExecuteQuery(obj) {
        return this.http.post('oumperso/imageExecuteQuery', obj);
    }
    /** This is description of the vStfAddrExecuteQuery function*/
    vStfAddrExecuteQuery(obj) {
        return this.http.post('oumperso/vStfAddrExecuteQuery', obj);
    }
    /** This is description of the addrPhonesExecuteQuery function*/
    addrPhonesExecuteQuery(obj) {
        return this.http.post('oumperso/addrPhonesExecuteQuery', obj);
    }
    /** This is description of the addrPhonesCommit function*/
    addrPhonesCommit(obj) {
        return this.http.post('oumperso/addrPhonesCommit', obj);
    }
    /** This is description of the stfPhonesExecuteQuery function*/
    stfPhonesExecuteQuery(obj) {
        return this.http.post('oumperso/stfPhonesExecuteQuery', obj);
    }
    /** This is description of the stfPhonesCommit function*/
    stfPhonesCommit(obj) {
        return this.http.post('oumperso/stfPhonesCommit', obj);
    }
    /** This is description of the emailAddrExecuteQuery function*/
    emailAddrExecuteQuery(obj) {
        return this.http.post('oumperso/emailAddrExecuteQuery', obj);
    }
    /** This is description of the emailAddrCommit function*/
    emailAddrCommit(obj) {
        return this.http.post('oumperso/emailAddrCommit', obj);
    }
    /** This is description of the rgPhoneTypeRecordGroup function*/
    rgPhoneTypeRecordGroup() {
        return this.http.get('oumperso/rgPhoneTypeRecordGroup');
    }
    /** This is description of the rgSuffixRecordGroup function*/
    rgSuffixRecordGroup() {
        return this.http.get('oumperso/rgSuffixRecordGroup');
    }
    /** This is description of the rgSexCodeRecordGroup function*/
    rgSexCodeRecordGroup() {
        return this.http.get('oumperso/rgSexCodeRecordGroup');
    }
    /** This is description of the rgStatusRecordGroup function*/
    rgStatusRecordGroup() {
        return this.http.get('oumperso/rgStatusRecordGroup');
    }
    /** This is description of the rgPersonnelTypeRecordGroup function*/
    rgPersonnelTypeRecordGroup() {
        return this.http.get('oumperso/rgPersonnelTypeRecordGroup');
    }
    /** This is description of the rgPositionRecordGroup function*/
    rgPositionRecordGroup() {
        return this.http.get('oumperso/rgPositionRecordGroup');
    }

    rgTownRecordGroup() {
        return this.http.get( 'ocdoapop/rgTownRecordGroup' );
    }

    rgStateRecordGroup() {
        return this.http.get( 'ocdoapop/rgStateRecordGroup' );
    }

    rgCountryRecordGroup1() {
        return this.http.get( 'ocdoapop/rgCountryRecordGroup1' );
    }
}
