import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmstoffService {
constructor(private http: HttpService) { }
/** This is description of the prgPrfGdExecuteQuery function*/
prgPrfGdExecuteQuery(obj) {
return this.http.post('ocmstoff/prgPrfGdExecuteQuery', obj);
}
/** This is description of the prgPrfGdCommit function*/
prgPrfGdCommit(obj) {
return this.http.post('ocmstoff/prgPrfGdCommit', obj);
}
/** This is description of the prgPrfRcExecuteQuery function*/
prgPrfRcExecuteQuery(obj) {
return this.http.post('ocmstoff/prgPrfRcExecuteQuery', obj);
}
/** This is description of the prgPrfRcCommit function*/
prgPrfRcCommit(obj) {
return this.http.post('ocmstoff/prgPrfRcCommit', obj);
}
/** This is description of the prgPrfAgExecuteQuery function*/
prgPrfAgExecuteQuery(obj) {
return this.http.post('ocmstoff/prgPrfAgExecuteQuery', obj);
}
/** This is description of the prgPrfAgCommit function*/
prgPrfAgCommit(obj) {
return this.http.post('ocmstoff/prgPrfAgCommit', obj);
}
/** This is description of the prgPrfFaExecuteQuery function*/
prgPrfFaExecuteQuery(obj) {
return this.http.post('ocmstoff/prgPrfFaExecuteQuery', obj);
}
/** This is description of the prgPrfFaCommit function*/
prgPrfFaCommit(obj) {
return this.http.post('ocmstoff/prgPrfFaCommit', obj);
}
/** This is description of the prgPrfIgExecuteQuery function*/
prgPrfIgExecuteQuery(obj) {
return this.http.post('ocmstoff/prgPrfIgExecuteQuery', obj);
}
/** This is description of the prgPrfIgCommit function*/
prgPrfIgCommit(obj) {
return this.http.post('ocmstoff/prgPrfIgCommit', obj);
}
/** This is description of the prgPrfXgExecuteQuery function*/
prgPrfXgExecuteQuery(obj) {
return this.http.post('ocmstoff/prgPrfXgExecuteQuery', obj);
}
/** This is description of the prgPrfXgCommit function*/
prgPrfXgCommit(obj) {
return this.http.post('ocmstoff/prgPrfXgCommit', obj);
}
/** This is description of the rgPsSexRecordGroup function*/
rgPsSexRecordGroup(): Observable<any> {
return this.http.get('ocmstoff/rgPsSexRecordGroup');
}
/** This is description of the rgEthnicityRecordGroup function*/
rgEthnicityRecordGroup(): Observable<any> {
return this.http.get('ocmstoff/rgEthnicityRecordGroup');
}
/** This is description of the rgPsNeedsRecordGroup function*/
rgPsNeedsRecordGroup() {
return this.http.get('ocmstoff/rgPsNeedsRecordGroup');
}
/** This is description of the rgPsAgeRangeRecordGroup function*/
rgPsAgeRangeRecordGroup() {
return this.http.get('ocmstoff/rgPsAgeRangeRecordGroup');
}
/** This is description of the rgPsOffGrpsRecordGroup function*/
rgPsOffGrpsRecordGroup() {
return this.http.get('ocmstoff/rgPsOffGrpsRecordGroup');
}
getProfileExistIn(obj) {
    return this.http.post('ocmstoff/getProfileExist', obj);
    }
}
