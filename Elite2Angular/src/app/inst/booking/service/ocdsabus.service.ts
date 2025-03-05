import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdsabusService {
constructor(private http: HttpService) { }
/** This is description of the offSuExecuteQuery function*/
offSuExecuteQuery(obj) {
return this.http.post('ocdsabus/offSuExecuteQuery', obj);
}
/** This is description of the offSuCommit function*/
offSuCommit(obj) {
return this.http.post('ocdsabus/offSuCommit', obj);
}
/** This is description of the offSdExecuteQuery function*/
offSdExecuteQuery(obj) {
return this.http.post('ocdsabus/offSdExecuteQuery', obj);
}
/** This is description of the offSdCommit function*/
offSdCommit(obj) {
return this.http.post('ocdsabus/offSdCommit', obj);
}
/** This is description of the offStExecuteQuery function*/
offStExecuteQuery(obj) {
return this.http.post('ocdsabus/offStExecuteQuery', obj);
}
/** This is description of the offStCommit function*/
offStCommit(obj) {
return this.http.post('ocdsabus/offStCommit', obj);
}
/** This is description of the ageRecordGroup function*/
ageRecordGroup(obj) {
return this.http.get('ocdsabus/ageRecordGroup');
}
/** This is description of the lSourceInfoRecordGroup function*/
lSourceInfoRecordGroup(obj) {
return this.http.get('ocdsabus/lSourceInfoRecordGroup');
}
/** This is description of the cgfkOffsudspdescriptionRecordGroup function*/
cgfkOffsudspdescriptionRecordGroup(obj) {
return this.http.get('ocdsabus/cgfk$offSuDspDescriptionRecordGroup');
}
/** This is description of the cgfkOffstdspdescription3RecordGroup function*/
cgfkOffstdspdescription3RecordGroup(obj) {
return this.http.get('ocdsabus/cgfk$offStDspDescription3RecordGroup');
}
/** This is description of the cgfkOffstdspdescriptionRecordGroup function*/
cgfkOffstdspdescriptionRecordGroup(obj) {
return this.http.get('ocdsabus/cgfk$offStDspDescriptionRecordGroup');
}
/** This is description of the cgfkOffsddspdescriptionRecordGroup function*/
cgfkOffsddspdescriptionRecordGroup(obj) {
return this.http.get('ocdsabus/cgfk$offSdDspDescriptionRecordGroup');
}
onDeleteOfSuAbHistory(obj) {
    return this.http.post('ocdsabus/onDeleteOfSuAbHistory', obj);
    }
}
