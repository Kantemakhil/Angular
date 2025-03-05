import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OcdleglsService {
  vctRcrdIndexVal : number;
  linkedOffIndexVal : number;
  constructor(private http: HttpService) { }

  loadData(data) {
    return this.http.post('ocmpconf/getFormData',data);
  }

  loadKeyDates(userId, moduleName){
    return this.http.get('/getReferenceDomainCodes?domain=KEY_DATES&moduleName='+moduleName);
  }

  saveData(data) {
    return this.http.post('ocmpconf/submitFormData', data);
  }
  
  verifyData(data) {
    return this.http.post('ocmpconf/verification', data);
  }

  getStaffRoles() {
    return this.http.get('ocmpconf/getStaffRoles');
  }

  loadVerifiedData(data) {
    return this.http.post('ocmpconf/getOcdleglsHytData', data);
  }
  
  searchHoldWarrentDetainer(offenderBookId){
        return this.http.get('ocdlegls/searchHoldWarrentDetainer?offenderBookId='+offenderBookId);
    }

  rgOrderStatus() {
    return this.http.get('ocmpconf/rgOrderStatus');
  }

  fetchReleaseDate(offenderBookId){
    return this.http.get('oidrelsc/getReleaseDate?offenderBookId='+offenderBookId);
  }

  populateSentType(obj){
    return this.http.get('ocmpconf/populateSentType?sentCategory='+obj);
  }

  getOffenderPendingEvents(data) {
    return this.http.post('ocipensc/getPendingSentenceCalcEvents', data);
  }

 
  getERDHideShowValue(obj) {
		return this.http.get( 'ocmpconf/getERDHideShowValue?code=' + obj);
		}

   
}
