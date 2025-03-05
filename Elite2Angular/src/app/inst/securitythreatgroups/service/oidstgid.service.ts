import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstgidService {
   constructor(private http: HttpService) { }
   /** This is description of the stgIdentifiersExecuteQuery function*/
   stgIdentifiersExecuteQuery(obj) {
      return this.http.post('oidstgid/stgIdentifiersExecuteQuery', obj);
   }
   /** This is description of the stgIdentifiersCommit function*/
   stgIdentifiersCommit(obj) {
      return this.http.post('oidstgid/stgIdentifiersCommit', obj);
   }
   /** This is description of the image1ExecuteQuery function*/
   image1ExecuteQuery(obj) {
      return this.http.post('oidstgid/image1ExecuteQuery', obj);
   }
   /** This is description of the image1Commit function*/
   image1Commit(obj) {
      return this.http.post('oidstgid/image1Commit', obj);
   }
   /** This is description of the stgIdentifyingWordsExecuteQuery function*/
   stgIdentifyingWordsExecuteQuery(obj) {
      return this.http.post('oidstgid/stgIdentifyingWordsExecuteQuery', obj);
   }
   /** This is description of the stgIdentifyingWordsCommit function*/
   stgIdentifyingWordsCommit(obj) {
      return this.http.post('oidstgid/stgIdentifyingWordsCommit', obj);
   }
   /** This is description of the rgProfileTypeRecordGroup function*/
   rgProfileTypeRecordGroup() {
      return this.http.get('oidstgid/rgProfileTypeRecordGroup');
   }
   oidstgidGetGlobalStgDescription(stgId) {
      return this.http.get(`oidstgid/oidstgidGetGlobalStgDescription?stgId=${stgId}`);
   }
}
