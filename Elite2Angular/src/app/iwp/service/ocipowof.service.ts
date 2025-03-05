import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcipowofService {
   constructor(private http: HttpService) { }
   /** This is description of the staffExecuteQuery function*/
   staffExecuteQuery(obj) {
      return this.http.post('ocipowof/staffExecuteQuery', obj);
   }
   /** This is description of the cPlanExecuteQuery function*/
   cPlanExecuteQuery(obj) {
      return this.http.post('ocipowof/cPlanExecuteQuery', obj);
   }
   /** This is description of the vAssOffExecuteQuery function*/
   vAssOffExecuteQuery(obj) {
      return this.http.post('ocipowof/vAssOffExecuteQuery', obj);
   }
   /** This is description of the vswaExecuteQuery function*/
   vswaExecuteQuery(obj) {
      return this.http.post('ocipowof/vswaExecuteQuery', obj);
   }
   /** This is description of the potWtgExecuteQuery function*/
   potWtgExecuteQuery(obj) {
      return this.http.post('ocipowof/potWtgExecuteQuery', obj);
   }
   /** This is description of the cgfkVswadspdescription4RecordGroup function*/
   cgfkVswadspdescription4RecordGroup(obj) {
      return this.http.get('ocipowof/cgfk$vswaDspDescription4RecordGroup');
   }
   /** This is description of the cgfkVswaordercodeRecordGroup function*/
   cgfkVswaordercodeRecordGroup(obj) {
      return this.http.get('ocipowof/cgfk$vswaOrderCodeRecordGroup');
   }
   /** This is description of the cgfkVswadspdescription2RecordGroup function*/
   cgfkVswadspdescription2RecordGroup(obj) {
      return this.http.get('ocipowof/cgfk$vswaDspDescription2RecordGroup');
   }
   /** This is description of the cgfkVswaordertypeRecordGroup function*/
   cgfkVswaordertypeRecordGroup(obj) {
      return this.http.get('ocipowof/cgfk$vswaOrderTypeRecordGroup');
   }
}
