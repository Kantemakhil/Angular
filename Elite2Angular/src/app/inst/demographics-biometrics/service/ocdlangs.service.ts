import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdlangsService {
    constructor(private http: HttpService) { }
    /** This is description of the offPrimLangExecuteQuery function*/
    offPrimLangExecuteQuery(obj) {
        return this.http.post('ocdlangs/offPrimLangExecuteQuery', obj);
    }
    /** This is description of the offPrimLangCommit function*/
    offPrimLangCommit(obj) {
        return this.http.post('ocdlangs/offPrimLangCommit', obj);
    }
    /** This is description of the prefLangWriteExecuteQuery function*/
    prefLangWriteExecuteQuery(obj) {
        return this.http.post('ocdlangs/prefLangWriteExecuteQuery', obj);
    }
    /** This is description of the prefLangWriteCommit function*/
    prefLangWriteCommit(obj) {
        return this.http.post('ocdlangs/prefLangWriteCommit', obj);
    }
    /** This is description of the prefLangSpeakExecuteQuery function*/
    prefLangSpeakExecuteQuery(obj) {
        return this.http.post('ocdlangs/prefLangSpeakExecuteQuery', obj);
    }
    /** This is description of the prefLangSpeakCommit function*/
    prefLangSpeakCommit(obj) {
        return this.http.post('ocdlangs/prefLangSpeakCommit', obj);
    }
    /** This is description of the offSecLangExecuteQuery function*/
    offSecLangExecuteQuery(obj) {
        return this.http.post('ocdlangs/offSecLangExecuteQuery', obj);
    }
    /** This is description of the offSecLangCommit function*/
    offSecLangCommit(obj) {
        return this.http.post('ocdlangs/offSecLangCommit', obj);
    }
    /** This is description of the rgLangSkillsRecordGroup function*/
    rgLangSkillsRecordGroup() {
        return this.http.get('ocdlangs/rgLangSkillsRecordGroup');
    }
    /** This is description of the rgPrefLangRecordGroup function*/
    rgPrefLangRecordGroup() {
        return this.http.get('ocdlangs/rgPrefLangRecordGroup');
    }
    /** This is description of the rgSecLangRecordGroup function*/
    rgSecLangRecordGroup() {
        return this.http.get('ocdlangs/rgSecLangRecordGroup');
    }
    /** This is description of the getPreferredDefault function*/
    getPreferredDefault() {
        return this.http.get('ocdlangs/getPreferredDefault');
    }
}
