import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumrelmdService {
   constructor(private http: HttpService) { }


   getRelatedModulesByModuleName(moduleName) {
      return this.http.get('oumrelmd/getRelatedModulesByModuleName?moduleName=' + moduleName);
   }

   //Insert update and delete 

   insertUpdateDelete(obj) {
      return this.http.post('oumrelmd/insertUpdateDelete', obj);
   }

   getLovList() {
      return this.http.get('oumrelmd/rgMenuSecDescRecordGroup');
   }

   rleInarcExecuteQuery(obj) {
      return this.http.post('oumrelmd/rleInarcExecuteQuery', obj);
   }

}