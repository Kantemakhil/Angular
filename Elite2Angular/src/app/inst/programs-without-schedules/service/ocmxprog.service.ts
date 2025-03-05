import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmxprogService {
constructor(private http: HttpService) {}
/** This is description of the crsActExecuteQuery function*/
crsActExecuteQuery(obj) {
return this.http.post('ocmxprog/crsActExecuteQuery', obj);
}
/** This is description of the crsActCommit function*/
crsActCommit(obj) {
return this.http.post('ocmxprog/crsActCommit', obj);
}
/** This is description of the rgPsProvTypeRecordGroup function*/
rgPsProvTypeRecordGroup(obj) {
return this.http.get( 'ocmxprog/rgPsProvTypeRecordGroup');
}
/** This is description of the rgProviderRecordGroup function*/
rgProviderRecordGroup(caseLoadId, caseLoadType, providerType) {
return this.http.get('ocmxprog/rgProviderRecordGroup?caseLoadId=' + caseLoadId
+ '&caseLoadType=' + caseLoadType  + '&providerType=' + providerType);
}
/** This is description of the rgProgramTypeRecordGroup function*/
rgProgramTypeRecordGroup() {
return this.http.get( 'ocmxprog/rgProgramTypeRecordGroup');
}
/** This is description of the rgIntLocRecordGroup function*/
rgIntLocRecordGroup(agyLocId) {
return this.http.get( 'ocmxprog/rgIntLocRecordGroup?agyLocId=' + agyLocId);
}
}
