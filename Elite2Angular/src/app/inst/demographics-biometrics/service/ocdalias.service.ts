import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

import { TagSearchGetOffenderRecords } from '@commonbeans/TagSearchGetOffenderRecords';
@Injectable({providedIn: 'root'})
export class OcdaliasService {
    data: TagSearchGetOffenderRecords = new TagSearchGetOffenderRecords();
    list: any[] = [];
    constructor(private http: HttpService) { }
    /** This is description of the offNameExecuteQuery function*/
    offNameExecuteQuery(obj) {
        return this.http.post('ocdalias/offNameSearchOffenders', obj);
    }
    /** This is description of the offNameCommit function*/
    offNameCommit(obj) {
        return this.http.post('ocdalias/offNameCommit', obj);
    }
    /** This is description of the offIdCommit function*/
    offidCommit(obj) {
        return this.http.post('ocdalias/offIdCommit', obj);
    }
    /** This is description of the offIdExecuteQuery function*/
    offIdExecuteQuery(obj) {
        return this.http.post('ocdalias/offIdSearchOffenderIdentifiers', obj);
    }
    /** This is description of the offIdCommit function*/
    offIdSaveCommit(obj) {
        return this.http.post('ocdalias/offOffIdSaveUpdate', obj);
    }
    /** This is description of the offIdAllExecuteQuery function*/
    offIdAllExecuteQuery(obj) {
        return this.http.post('ocdalias/offIdAllSearchOffenderIdentifiers', obj);
    }
    /** This is description of the reqNameExecuteQuery function*/
    reqNameExecuteQuery(obj) {
        return this.http.post('ocdalias/reqNameSearchOffenderBookings', obj);
    }
    /** This is description of the reqNameCommit function*/
    reqNameCommit(obj) {
        return this.http.post('ocdalias/reqNameCommit', obj);
    }
    /** This is description of the offBkgOnCheckDeleteMasteroff_name_cur function*/
    offBkgOnCheckDeleteMasteroff_name_cur(obj) {
        return this.http.post('ocdalias/offbkgonCheckDeleteMasterOffNameCur', obj);
    }
    /** This is description of the offNameOnCheckDeleteMasteroff_id_cur function*/
    offNameOnCheckDeleteMasteroffIdCur(obj) {
        return this.http.post('ocdalias/offNameOnCheckDeleteMasteroffIdCur', obj);
    }
    /** This is description of the offIdPreInsert function*/
    offIdPreInsert(obj) {
        return this.http.post('ocdalias/offIdpreinsert', obj);
    }
    /** To Delete records from Offenders, OffenderIdentifiers  */
    offOffIdDelete(obj) {
        return this.http.post('ocdalias/offOffIdDelte', obj);
    }
    /** This is description of the cgrichkOffendersc function*/
    cgrichkOffendersc(obj) {
        return this.http.post('ocdalias/cgrichkoffenderscc', obj);
    }
    /** This is description of the checkPncExistsgetPncEx function*/
    checkPncExistsgetPncEx(obj) {
        return this.http.post('ocdalias/checkPncExistsgetPncEx', obj);
    }
    /** This is description of the offChangeWorkingName function*/
    offChangeWorkingName(obj) {
        return this.http.post('ocdalias/changeWorkingName', obj);
    }
    /** This is description of the getWorkingNameOffenderID function*/
    getWorkingNameOffenderID(obj) {
        return this.http.post('ocdalias/getWorkingNameOffenderID', obj);
    }
    /** This is description of the gender function*/
    getGenderDescription() {
        return this.http.get('ocdalias/getGenderDescription');
    }
      /** This is description of vsRangeCursor function*/
      vsRangeCursor() {
        return this.http.get('ocdalias/vsRangeCursor');
    }

}
