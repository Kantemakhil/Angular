
import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { VPimsNameSearch } from '../beans/VPimsNameSearch';

@Injectable()
export class OcimyoffService {
   
   constructor(private http: HttpService) { }
   public oiinamesflag: boolean = false;
   agencyIncidentsModeldataTemp: any;
   ctrEveModelTemp: any;
   crtEveDataTemp: any[] = [];
   oiiflag: boolean;
   oidscmovFlag: boolean;
   eventId: any;
   routUrl: string;
   public offsearch: any;
   offenderRowData: any[] = [];
   getMyOffendersList(obj) {
      return this.http.post('ocimyoff/getMyOffendersList', obj);
      }

      offenderConditionExecuteQuery(obj) {
         return this.http.post('ocimyoff/offenderConditionExcuteQuery', obj);
     }
}