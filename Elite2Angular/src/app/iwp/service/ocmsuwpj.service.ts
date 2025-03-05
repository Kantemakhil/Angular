import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({ providedIn: 'root' })
export class OcmsuwpjService {
 
  constructor(private http: HttpService) { }
  /** This is description of the courseActExecuteQuery function*/
  courseActExecuteQuery(obj) {
    return this.http.post('ocmsuwpj/courseActExecuteQuery', obj);
  }
  /** This is description of the courseActCommit function*/
  courseActCommit(obj) {
    return this.http.post('ocmsuwpj/courseActCommit', obj);
  }
  /** This is description of the rgTeamRecordGroup function*/
  rgTeamRecordGroup() {
    return this.http.get('ocmsuwpj/rgTeamRecordGroup');
  }
  /** This is description of the rgBeneficiaryTypeRecordGroup function*/
  rgBeneficiaryTypeRecordGroup(obj) {
    return this.http.get('ocmsuwpj/rgBeneficiaryTypeRecordGroup');
  }
  /** This is description of the rgPlacementNameRecordGroup function*/
  rgPlacementNameRecordGroup(obj) {
    return this.http.get('ocmsuwpj/rgPlacementNameRecordGroup');
  }
  /** This is description of the rgPlacementAddressesRecordGroup function*/
  rgPlacementAddressesRecordGroup(obj) {
    return this.http.get('ocmsuwpj/rgPlacementAddressesRecordGroup');
  }
  placementExecuteQuery(obj) {
    return this.http.post('ocmsuwpj/placementExecuteQuery', obj);
  }

  placementAddressExecuteQuery(placementCorporateId) {
    return this.http.get('ocmsuwpj/rgPlacementAddressesRecordGroup?placementCorporateId=' + placementCorporateId);
  }

  placementCommit(obj) {
    return this.http.post('ocmsuwpj/placementCommit', obj);
  }

  rgProviderRecordGroup(caseLoadId, caseLoadType, providerType) {
    return this.http.get('ocmsuwpj/rgProviderRecordGroup?caseLoadId=' + caseLoadId
    + '&caseLoadType=' + caseLoadType  + '&providerType=' + providerType);
    }

    rgIntLocRecordGroup(agyLocId) {
      return this.http.get( 'ocmsuwpj/rgIntLocRecordGroup?agyLocId=' + agyLocId);
      }

      rgProgramTypeRecordGroup() {
        return this.http.get( 'ocmsuwpj/rgProgramTypeRecordGroup');
        }

  rgProviderRecordGroupTeam(caseLoadId, caseLoadType, providerType) {
    return this.http.get('ocmsuwpj/rgProviderRecordGroupTeam?caseLoadId=' + caseLoadId
      + '&caseLoadType=' + caseLoadType + '&providerType=' + providerType);
  }
}
