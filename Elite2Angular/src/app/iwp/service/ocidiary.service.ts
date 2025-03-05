import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcidiaryService {
constructor(private http: HttpService) {}
/** This is description of the offSchExecuteQuery function*/
offSchExecuteQuery(obj) {
return this.http.post('/ocidiary/offSchExecuteQuery',obj);
}
/** This is description of the offSchCommit function*/
offSchCommit(obj) {
return this.http.post('ocidiary/offSchCommit',obj);
}
/** This is description of the rgLocationRecordGroup function*/
rgLocationRecordGroup(obj) {
return this.http.get( 'ocidiary/rgLocationRecordGroup');
}
/** This is description of the rgTypeRecordGroup function*/
rgTypeRecordGroup(obj) {
return this.http.get( 'ocidiary/rgTypeRecordGroup');
}
/** This is description of the rgSubTypeRecordGroup function*/
rgSubTypeRecordGroup(obj) {
return this.http.get( 'ocidiary/rgSubTypeRecordGroup');
}
/** This is description of the rgOffSchOutcomeRecordGroup function*/
rgOffSchOutcomeRecordGroup(obj) {
return this.http.get( 'ocidiary/rgOffSchOutcomeRecordGroup');
}
/** This is description of the rgOutcomeRecordGroup function*/
rgOutcomeRecordGroup(obj) {
return this.http.get( 'ocidiary/rgOutcomeRecordGroup');
}
}
