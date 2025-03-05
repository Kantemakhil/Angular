import { Injectable } from '@angular/core';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiischedService {
   vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
   oidpactiFlag: boolean;
   exitFlag: boolean;
   constructor(private http: HttpService) { }
   /** This is description of the offSchExecuteQuery function*/
   offschExecuteQuery(obj) {
      return this.http.post('oiisched/offSchExecuteQuery', obj);
   }
   /** This is description of the rgSchFilterRecordGroup function*/
   rgSchFilterRecordGroup(obj) {
      return this.http.get('oiisched/rgSchFilterRecordGroup');
   }
   /** This is description of the rgTypeRecordGroup function*/
   rgTypeRecordGroup(obj) {
      return this.http.get('oiisched/rgTypeRecordGroup');
   }
   /** This is description of the rgSubtypeRecordGroup function*/
   rgSubtypeRecordGroup(scheduleFilter, scheduleType) {
      return this.http.get('oiisched/rgSubtypeRecordGroup?scheduleFilter=' + scheduleFilter + '&scheduleType=' + scheduleType);
   }
   getOffenderBookId(offenderIdDisplay, caseloadId) {
      return this.http.get('oiisched/getOffenderBookId?offenderIdDisplay=' + offenderIdDisplay + '&caseloadId=' + caseloadId);
   }
}
