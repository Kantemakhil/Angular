import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiigrievService {
    serviceData: any;
    constructor(private http: HttpService) {}
    /** This is description of the grieDetExecuteQuery function*/
    grieDetExecuteQuery(obj) {
        return this.http.post('oiigriev/grieDetExecuteQuery', obj);
    }
    /** This is description of the rgAgyRecordGroup function*/
    rgAgyRecordGroup(obj) {
        return this.http.get( 'oiigriev/rgAgyRecordGroup');
    }
    /** This is description of the rgGrieTypeRecordGroup function*/
    rgGrieTypeRecordGroup(obj) {
        return this.http.get( 'oiigriev/rgGrieTypeRecordGroup');
    }
    /** This is description of the rgStaffAsgRecordGroup function*/
    rgStaffAsgRecordGroup(obj) {
        return this.http.get( 'oiigriev/rgStaffAsgRecordGroup');
    }
    /** This is description of the rgLevelRecordGroup function*/
    rgLevelRecordGroup(obj) {
        return this.http.get( 'oiigriev/rgLevelRecordGroup');
    }
    /** This is description of the rgStaffInvRecordGroup function*/
    rgStaffInvRecordGroup(obj) {
        return this.http.get( 'oiigriev/rgStaffInvRecordGroup');
    }
    offbkgGlobalQuery(obj: any) {
        return this.http.post('osiosear/offbkgGlobalQuery', obj);
    }
    whenNewRecordInstance() {
        return this.http.get( 'oiigriev/whenNewRecordInstance');
    }
}
