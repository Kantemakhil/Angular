import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OcmsvacpService {
  constructor(private http: HttpService) { }
  /** This is description of the crsActExecuteQuery function*/
  crsActExecuteQuery(obj) {
    return this.http.post('ocmsvacp/crsActExecuteQuery', obj);
  }
  /** This is description of the crsActCommit function*/
  crsActCommit(obj) {
    return this.http.post('ocmsvacp/crsActCommit', obj);
  }
  /** This is description of the vCrsPhsExecuteQuery function*/
  vCrsPhsExecuteQuery(obj) {
    return this.http.post('ocmsvacp/vCrsPhsExecuteQuery', obj);
  }
  /** This is description of the vCrsPhsCommit function*/
  vCrsPhsCommit(obj) {
    return this.http.post('ocmsvacp/vCrsPhsCommit', obj);
  }
  /** This is description of the rgRefCodeRecordGroup function*/
  rgRefCodeRecordGroup(obj) {
    return this.http.get('ocmsvacp/rgRefCodeRecordGroup');
  }
  /** This is description of the rgProviderRecordGroup function*/
  rgProviderRecordGroup(providerType, caseLoadType, caseLoadId) {
    return this.http.get('ocmsvacp/rgProviderRecordGroup?providerType=' + providerType + '&caseLoadType=' + caseLoadType +
      '&caseLoadId=' + caseLoadId);
  }
  /** This is description of the rgTeamAgyLocsRecordGroup function*/
  rgTeamAgyLocsRecordGroup(caseLoadId) {
    return this.http.get('ocmsvacp/rgTeamAgyLocsRecordGroup?caseLoadId=' + caseLoadId);
  }
  /** This is description of the rgCorpLocsRecordGroup function*/
  rgCorpLocsRecordGroup(obj) {
    return this.http.get('ocmsvacp/rgCorpLocsRecordGroup');
  }
  /** This is description of the rgAgyLocsRecordGroup function*/
  rgAgyLocsRecordGroup(obj) {
    return this.http.get('ocmsvacp/rgAgyLocsRecordGroup');
  }
  /** This is description of the rgAccProgramRecordGroup function*/
  rgAccProgramRecordGroup() {
    return this.http.get('ocmsvacp/rgAccProgramRecordGroup');
  }
  /** This is description of the rgIntLocationRecordGroup function*/
  rgIntLocationRecordGroup(obj) {
    return this.http.get('ocmsvacp/rgIntLocationRecordGroup');
  }
  /** This is description of the rgAddressRecordGroup function*/
  rgAddressRecordGroup(obj) {
    return this.http.get('ocmsvacp/rgAddressRecordGroup');
  }
  /** This is description of the rgAgyAddressRecordGroup function*/
  rgAgyAddressRecordGroup(obj) {
    return this.http.get('ocmsvacp/rgAgyAddressRecordGroup');
  }
  /** This is description of the rgAllAgyAddressRecordGroup function*/
  rgAllAgyAddressRecordGroup(providerPartyId) {
    return this.http.get('ocmsvacp/rgAllAgyAddressRecordGroup?providerPartyId=' + providerPartyId);
  }

  addressExecuteQuery(obj) {
    return this.http.post('ocmsvacp/addressExecuteQuery', obj);
  }
  addressExecuteQueryDialog(obj) {
    return this.http.post('ocmsvacp/addressExecuteQueryDialog', obj);
  }

}
