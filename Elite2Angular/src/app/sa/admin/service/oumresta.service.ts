import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumrestaService {
   constructor(private http: HttpService) {}
   /** This is description of the rleInarcExecuteQuery function*/
   rleInarcExecuteQuery(obj) {
      return this.http.post('oumresta/rleInarcExecuteQuery', obj);
   }
   /** This is description of the rleInarcCommit function*/
   rleInarcCommit(obj) {
      return this.http.post('oumresta/rleInarcCommit', obj);
   }
   /** This is description of the modPrivExecuteQuery function*/
   modPrivExecuteQuery(obj) {
      return this.http.post('oumresta/modPrivExecuteQuery', obj);
   }
   /** This is description of the rleInarc1ExecuteQuery function*/
   rleInarcRcriExecuteQuery(obj) {
      return this.http.post('oumresta/rleInarcRircExecuteQuery', obj);
   }
   /** This is description of the rleInarc1Commit function*/
   rleInarcRircCommit(obj) {
      return this.http.post('oumresta/rleInarcRircCommit', obj);
   }
   /** This is description of the cgfkRleinarcmodulenameRecordGroup function*/
   cgfkRleinarcmodulenameRecordGroup(obj) {
      return this.http.get( 'oumresta/cgfk$rleInarcModuleNameRecordGroup');
   }
   /** This is description of the cgfkRleinarc1domainRecordGroup function*/
   cgfkRleinarc1domainRecordGroup(obj) {
      return this.http.get( 'oumresta/cgfk$rleInarc1DomainRecordGroup');
   }
   /** This is description of the cgfkRleinarc1codeRecordGroup function*/
   cgfkRleinarc1codeRecordGroup(obj) {
      return this.http.get( 'oumresta/cgfk$rleInarc1CodeRecordGroup');
   }
}
