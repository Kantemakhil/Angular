import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiiwltwjService {
    constructor(private http: HttpService) {}
    /** This is description of the vTwlExecuteQuery function*/
    vTwlExecuteQuery(obj) {
        return this.http.get('oiiwltwj/vTwlExecuteQuery?caseLoadId=' + obj);
    }
    /** This is description of the vTwlCommit function*/
    vTwlCommit(obj) {
        return this.http.post('oiiwltwj/vTwlCommit', obj);
    }
    /** This is description of the cgfkVtwldspdescriptionRecordGroup function*/
    cgfkVtwldspdescriptionRecordGroup() {
        return this.http.get( 'oiiwltwj/cgfk$vTwlDspDescriptionRecordGroup');
    }
    /** This is description of the cgfkVtwlagencylocationtoRecordGroup function*/
    cgfkVtwlagencylocationtoRecordGroup() {
        return this.http.get( 'oiiwltwj/cgfkVTwlAgencyLocationToRecordGroup');
    }
    /** This is description of the cgfkVtwldspdescription3RecordGroup function*/
    cgfkVtwldspdescription3RecordGroup() {
        return this.http.get( 'oiiwltwj/cgfk$vTwlDspDescription3RecordGroup');
    }
    /** This is description of the rgCancelReasonRecordGroup function*/
    rgCancelReasonRecordGroup() {
        return this.http.get( 'oiiwltwj/rgCancelReasonRecordGroup');
    }

    /** This is description of the cgfkchkVTwlVTwlAgyLoc function*/
    cgfkchkVTwlVTwlAgyLoc(obj) {
        return this.http.get( 'oiiwltwj/cgfkchkVTwlVTwlAgyLoc?agencyLocId=' + obj);
    }

    CgfkchkVTwlVTwlVOffBkg(obj) {
        return this.http.get( 'oiiwltwj/CgfkchkVTwlVTwlVOffBkg?offenderBookId=' + obj);
    }
}
