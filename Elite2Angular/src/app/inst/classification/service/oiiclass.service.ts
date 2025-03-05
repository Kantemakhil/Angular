import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { OiiclassClassInquiry } from '../beans/OiiclassClassInquiry';

@Injectable({providedIn: 'root'})
export class OiiclassService {
    backButton: boolean;
    searchParam: any;

    constructor(private http: HttpService) { }
    /** This is description of the sysProfExecuteQuery function*/
    sysProfExecuteQuery(obj) {
        return this.http.post('oiiclass/sysProfExecuteQuery', obj);
    }
    /** This is description of the livUnitExecuteQuery function*/
    livUnitExecuteQuery(obj) {
        return this.http.post('oiiclass/livUnitExecuteQuery', obj);
    }
    /** This is description of the livUnitCommit function*/
    livUnitCommit(obj) {
        return this.http.post('oiiclass/livUnitCommit', obj);
    }
    /** This is description of the oiiclassExecuteQuery function*/
    oiiclassExecuteQuery(obj) {
        return this.http.post('oiiclass/oiiclassExecuteQuery', obj);
    }
    /** This is description of the cgfkSearchtypeRecordGroup function*/
    cgfkSearchtypeRecordGroup(obj) {
        return this.http.get('oiiclass/cgfk$searchTypeRecordGroup');
    }
    /** This is description of the cgfkAssessmenttypeRecordGroup function*/
    cgfkAssessmenttypeRecordGroup(obj) {
        return this.http.get('oiiclass/cgfk$assessmentTypeRecordGroup');
    }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    cgfkAgylocidRecordGroup(obj) {
        return this.http.get('oiiclass/cgfk$agyLocIdRecordGroup');
    }
    /** This is description of the cgfkHousinglevel1RecordGroup function*/
    cgfkHousinglevel1RecordGroup(obj) {
        return this.http.get('oiiclass/cgfk$housingLevel1RecordGroup');
    }
    /** This is description of the cgfkHousinglevel2RecordGroup function*/
    cgfkHousinglevel2RecordGroup(obj) {
        return this.http.get('oiiclass/cgfk$housingLevel2RecordGroup');
    }
    /** This is description of the cgfkHousinglevel3RecordGroup function*/
    cgfkHousinglevel3RecordGroup(obj) {
        return this.http.get('oiiclass/cgfk$housingLevel3RecordGroup');
    }
}
