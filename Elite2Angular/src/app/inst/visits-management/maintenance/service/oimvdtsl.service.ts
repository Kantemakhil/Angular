import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OimvdtslService {
constructor(private http: HttpService) {}
/** This is description of the agyVisitDaysExecuteQuery function*/
agyVisitDaysExecuteQuery(obj) {
return this.http.post('oimvdtsl/agyVisitDaysExecuteQuery',obj);
}
/** This is description of the agyVisitDaysCommit function*/
agyVisitDaysCommit(obj) {
return this.http.post('oimvdtsl/agyVisitDaysCommit',obj);
}
/** This is description of the agyVisitTimesExecuteQuery function*/
agyVisitTimesExecuteQuery(obj) {
return this.http.post('oimvdtsl/agyVisitTimesExecuteQuery',obj);
}
/** This is description of the agyVisitTimesCommit function*/
agyVisitTimesCommit(obj) {
return this.http.post('oimvdtsl/agyVisitTimesCommit',obj);
}
/** This is description of the agyVisitSlotsExecuteQuery function*/
agyVisitSlotsExecuteQuery(obj) {
return this.http.post('oimvdtsl/agyVisitSlotsExecuteQuery',obj);
}
/** This is description of the agyVisitSlotsCommit function*/
agyVisitSlotsCommit(obj) {
return this.http.post('oimvdtsl/agyVisitSlotsCommit',obj);
}
/** This is description of the rgAgyVisitDaysRecordGroup function*/
rgAgyVisitDaysRecordGroup(obj) {
return this.http.get( 'oimvdtsl/rgAgyVisitDaysRecordGroup');
}
/** This is description of the rgAgyIntLocRecordGroup function*/
rgAgyIntLocRecordGroup(obj) {
return this.http.get( 'oimvdtsl/rgAgyIntLocRecordGroup');
}
/** This is description of the rgAgyVisitSlotsRecordGroup function*/
rgAgyVisitSlotsRecordGroup(obj,obj2) {
return this.http.get( 'oimvdtsl/rgAgyVisitSlotsRecordGroup?agyLocId=' + obj+ '&caseLoadId=' + obj2);
}
/** This is description of the rgWeekdayRecordGroup function*/
rgWeekdayRecordGroup(obj) {
return this.http.get( 'oimvdtsl/rgWeekdayRecordGroup');
}
/** This is agyVisitDaysOnCheckDeleteMaster function*/
agyVisitDaysOnCheckDeleteMaster(obj) {
return this.http.post( 'oimvdtsl/agyVisitDaysOnCheckDeleteMaster', obj);
}
/** This is agyVisitTimesOnCheckDeleteMaster function*/
agyVisitTimesOnCheckDeleteMaster(obj) {
return this.http.post( 'oimvdtsl/agyVisitTimesOnCheckDeleteMaster', obj);
}
/** This is agyGetCapaityFrom function*/
agyGetCapaityFrom(obj) {
return this.http.post( 'oimvdtsl/agyGetCapaityFrom', obj);
}
/** This is agyVisitTimescheckboxChange function*/
agyVisitTimescheckboxChange(obj) {
return this.http.post( 'oimvdtsl/agyVisitTimescheckboxChange', obj);
}
}
