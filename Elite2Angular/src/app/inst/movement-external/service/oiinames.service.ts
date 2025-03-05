import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '@core/service/http.service'
import { AgencyIncidents } from '@instincidentsbeans/AgencyIncidents';
@Injectable({providedIn: 'root'})
export class OiinamesService {
    public offsearch: any;
    offenderRowData: any[] = [];
    agencyincidentsDataTemp: AgencyIncidents[] = [];
    public oiinamesflag: boolean = false;
    agencyIncidentsModeldataTemp: any;
    ctrEveModelTemp: any;
    crtEveDataTemp: any[] = [];
    oiiflag: boolean;
    oidscmovFlag: boolean;
    eventId: any;
    routUrl: string;
    agencyIncidents: AgencyIncidents = new AgencyIncidents();
    constructor(private http: HttpService,private router : Router) { }
    /** This is description of the nameSrchExecuteQuery function*/
    namesrchExecuteQuery(obj) {
        obj.parentForm = this.router.url;
        return this.http.post('oiinames/nameSrchExecuteQuery', obj);
    }
    /** This is description of the nameSrchCommit function*/
    nameSrchCommit(obj) {
        return this.http.post('oiinames/nameSrchCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oiinames/sysPflExecuteQuery', obj);
    }
    /** This is description of the findAgyLocIdList function*/
    findAgyLocIdList() {
        this.agencyIncidents.parentForm=this.router.url
        return this.http.post('oiinames/findAgyLocIdList',this.agencyIncidents);
    }
    /** This is description of the findLivingUnitsList function*/
    findLivingUnitsList() {
        this.agencyIncidents.parentForm=this.router.url
        return this.http.post('oiinames/findLivingUnitsList',this.agencyIncidents);
    }
    /** This is description of the findActiveFlagList function*/
    findActiveFlagList() {
        this.agencyIncidents.parentForm=this.router.url
        return this.http.post('oiinames/findActiveFlagList',this.agencyIncidents);
    }
    /** This is description of the cgwhenNewFormInstance function*/
    cgwhenNewFormInstance() {
        return this.http.get('oiinames/cgwhenNewFormInstance');
    }
    /** This is description of the findAgyLocIdListLov function*/
    findAgyLocIdListLov() {
        return this.http.get('oiinames/findAgyLocIdListLov');
    }
    offbkgGlobalQuery(obj) {
        return this.http.post('oiinames/offbkgGlobalQuery', obj);
   }
}
