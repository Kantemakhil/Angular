import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmcondiService {
constructor(private http: HttpService) {}
/** This is description of the comCondExecuteQuery function*/
comCondExecuteQuery(obj) {
return this.http.post('ocmcondi/comCondExecuteQuery',obj);
}
/** This is description of the comCondCommit function*/
comCondCommit(obj) {
return this.http.post('ocmcondi/comCondCommit',obj);
}
comCondFilteredData(obj){
    return this.http.post('ocmcondi/comCondFilteredData', obj);
}
/** This is description of the rgCatRecordGroup function*/
rgCatRecordGroup(obj) {
return this.http.get( 'ocmcondi/rgCatRecordGroup');
}
/** This is description of the rgTypeRecordGroup function*/
rgTypeRecordGroup(obj) {
return this.http.get( 'ocmcondi/rgTypeRecordGroup');
}
/** This is description of the rgUnitRecordGroup function*/
rgUnitRecordGroup(obj) {
return this.http.get( 'ocmcondi/rgUnitRecordGroup');
}
/** This is description of the rgSvcOblRecordGroup function*/
rgSvcOblRecordGroup(obj) {
return this.http.get( 'ocmcondi/rgSvcOblRecordGroup');
}
/** This is description of the rgFunctionTypeRecordGroup function*/
rgFunctionTypeRecordGroup(obj) {
return this.http.get( 'ocmcondi/rgFunctionTypeRecordGroup');
}
/** This function is get the child record count to delete the parent record */
okToModifyRecord(obj) {
return this.http.post('ocmcondi/okToModifyRecord',obj);
}
}
