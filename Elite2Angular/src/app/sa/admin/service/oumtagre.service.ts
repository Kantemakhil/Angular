import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumtagreService {
   constructor(private http: HttpService) {}
   /** This is description of the rleInarcExecuteQuery function*/
   rleInarcExecuteQuery(obj) {
      return this.http.post('oumtagre/rleInarcExecuteQuery', obj);
   }
   /** This is description of the moduleTablesExecuteQuery function*/
   moduleTablesExecuteQuery(obj) {
      return this.http.post('oumtagre/moduleTablesExecuteQuery', obj);
   }
   /** This is description of the moduleTablesCommit function*/
   moduleTablesCommit(obj) {
      return this.http.post('oumtagre/moduleTablesCommit', obj);
   }
   /** This is description of the moduleTabColumnsExecuteQuery function*/
   moduleTabColumnsExecuteQuery(obj) {
      return this.http.post('oumtagre/moduleTabColumnsExecuteQuery', obj);
   }
   /** This is description of the moduleTabColumnsCommit function*/
   moduleTabColumnsCommit(obj) {
      return this.http.post('oumtagre/moduleTabColumnsCommit', obj);
   }
   /** This is description of the rgModuleNameRecordGroup function*/
   rgModuleNameRecordGroup(obj) {
      return this.http.get( 'oumtagre/rgModuleNameRecordGroup');
   }
   /** This is description of the rgObjectNameRecordGroup function*/
   rgObjectNameRecordGroup(obj) {
      return this.http.get( 'oumtagre/rgObjectNameRecordGroup');
   }
   /** This is description of the rgColumnNameRecordGroup function*/
   rgColumnNameRecordGroup(obj) {
      return this.http.get( 'oumtagre/rgColumnNameRecordGroup');
   }
   /** This is description of the rgSetupModuleRecordGroup function*/
   rgSetupModuleRecordGroup(obj) {
      return this.http.get( 'oumtagre/rgSetupModuleRecordGroup');
   }

   validateTrigger(tableName) {
      return this.http.get('oumtagre/validateTriggerExist?tableName='+tableName);
  }

 





getAuditOnTable(tableName) {
   return this.http.get('oumtagre/validateTriggerExist?tableName='+tableName);
}

getModulesAssociatedWithTable(obj){
   return this.http.post('oumtagre/getModulesAssociatedWithTable', obj);
}
getTableDescriptions() {
   return this.http.get( 'oumtagre/getTablesDescription');
}
}
