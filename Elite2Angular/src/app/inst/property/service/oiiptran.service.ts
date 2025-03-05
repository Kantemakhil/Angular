import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { Images } from '@common/beans/Images';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Injectable({providedIn: 'root'})
export class OiiptranService {
    imagesDataTemp = new Images();
   constructor(private http: HttpService, private sessionManager: UserSessionManager) { }
   /** This is description of the offPiExecuteQuery function*/
   offPiExecuteQuery(obj) {
      return this.http.post('oiiptran/offPiExecuteQuery', obj);
   }
   /** This is description of the itmTxExecuteQuery function*/
   itmTxExecuteQuery(obj) {
      return this.http.post('oiiptran/itmTxExecuteQuery', obj);
   }
   /** This is description of the findReceivedList function*/
   findReceivedList() {
      return this.http.get('oiiptran/findReceivedList');
   }
   /** This is description of the findTypeList function*/
   findTypeList() {
      return this.http.get('oiiptran/findTypeList');
   }
   /** This is description of the findColorList function*/
   findColorList() {
      return this.http.get('oiiptran/findColorList');
   }
   /** This is description of the findConditionList function*/
   findConditionList() {
      return this.http.get('oiiptran/findConditionList');
   }
   /** This is description of the findFacilityList function*/
   findFacilityList() {
      return this.http.get('oiiptran/findFacilityList');
   }
   /** This is description of the findagyLocationList function*/
   findagyLocationList() {
      return this.http.get('oiiptran/findagyLocationList?caseLoadId='+this.sessionManager.currentCaseLoad);
   }
   offPiImagesExecuteQuery(obj) {
    return this.http.post('oiiptran/offPiImagesExecuteQuery', obj);
 }
}
