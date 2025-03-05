import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OtmbaccoService {
   constructor(private http: HttpService) { }
   /** This is description of the csldCabExecuteQuery function*/
   csldCabExecuteQuery(obj) {
      return this.http.post('otmbacco/csldCabExecuteQuery', obj);
   }
   /** This is description of the csldCabCommit function*/
   csldCabCommit(obj) {
      return this.http.post('otmbacco/csldCabCommit', obj);
   }
   /** This is description of the bankAmExecuteQuery function*/
   bankAmExecuteQuery(obj) {
      return this.http.post('otmbacco/bankAmExecuteQuery', obj);
   }
   /** This is description of the bankAmCommit function*/
   bankAmCommit(obj) {
      return this.http.post('otmbacco/bankAmCommit', obj);
   }
   /** This is description of the cgfkCsldcabbankaccounttypRecordGroup function*/
   cgfkCsldcabbankaccounttypRecordGroup(obj) {
      return this.http.get('otmbacco/cgfk$csldCabBankAccountTypRecordGroup');
   }
   /** This is description of the cgfkCsldcabpayeecorporateRecordGroup function*/
   cgfkCsldcabpayeecorporateRecordGroup(obj) {
      return this.http.get('otmbacco/cgfk$csldCabPayeeCorporateRecordGroup');
   }
   /** This is description of the cgfkCsldcabaccountcodeRecordGroup function*/
   cgfkCsldcabaccountcodeRecordGroup(obj) {
      return this.http.get('otmbacco/cgfk$csldCabAccountCodeRecordGroup');
   }
   /** This is description of the cgfkCsldcabaccountcodeRecordGroup function*/
   corporeteNameData(corporateName) {
      return this.http.get('otmbacco/corporeteNameData?corporateName=' + corporateName);
   }
}
