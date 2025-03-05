
import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OiimyoffService {
   public offsearch: any;
   offenderRowData: any[] = [];
    public oiinamesflag: boolean = false;
    agencyIncidentsModeldataTemp: any;
    ctrEveModelTemp: any;
    crtEveDataTemp: any[] = [];
    oiiflag: boolean;
    oidscmovFlag: boolean;
    eventId: any;
    routUrl: string;

   constructor(private http: HttpService) { }

   getMyOffendersList(obj) {
      return this.http.post('oiimyoff/getMyOffendersList', obj);
      }

}