import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiufsoffService {
    constructor(private http: HttpService) { }
    /** This is description of the vOffBkgExecuteQuery function*/
    vOffBkgExecuteQuery(obj) {
        return this.http.post('oiufsoff/vOffBkgExecuteQuery', obj);
    }
    /** This is description of the vOffBkgCommit function*/
    vOffBkgCommit(obj) {
        return this.http.post('oiufsoff/vOffBkgCommit', obj);
    }
    /** This is description of the cgfkAgylocidRecordGroup function*/
    cgfkAgylocidRecordGroup(obj) {
        return this.http.get('oiufsoff/cgfk$agyLocIdRecordGroup');
    }
    /** This is description of the cgfkHousinglevel1RecordGroup function*/
    cgfkHousinglevel1RecordGroup(obj) {
        return this.http.get('oiufsoff/cgfk$housingLevel1RecordGroup');
    }
    /** This is description of the cgfkHousinglevel2RecordGroup function*/
    cgfkHousinglevel2RecordGroup(obj) {
        return this.http.get('oiufsoff/cgfk$housingLevel2RecordGroup');
    }
    /** This is description of the cgfkHousinglevel3RecordGroup function*/
    cgfkHousinglevel3RecordGroup(obj) {
        return this.http.get('oiufsoff/cgfk$housingLevel3RecordGroup');
    }
}
