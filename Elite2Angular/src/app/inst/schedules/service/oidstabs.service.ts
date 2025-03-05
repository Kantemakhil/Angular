import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidstabsService {
   
    constructor(private http: HttpService) { }
    /** This is description of the offSchedulesExecuteQuery function*/
    offSchedulesExecuteQuery(obj) {
        return this.http.post('oidstabs/offSchedulesExecuteQuery', obj);
    }
    /** This is description of the offSchedulesCommit function*/
    offSchedulesCommit(obj) {
        return this.http.post('oidstabs/offSchedulesCommit', obj);
    }
    /** This is description of the agyAdrExecuteQuery function*/
    agyAdrExecuteQuery(obj) {
        return this.http.post('oidstabs/agyAdrExecuteQuery', obj);
    }
    /** This is description of the agyAdrCommit function*/
    agyAdrCommit(obj) {
        return this.http.post('oidstabs/agyAdrCommit', obj);
    }
    /** This is description of the busAdrExecuteQuery function*/
    busAdrExecuteQuery(obj) {
        return this.http.post('oidstabs/busAdrExecuteQuery', obj);
    }
    /** This is description of the busAdrCommit function*/
    busAdrCommit(obj) {
        return this.http.post('oidstabs/busAdrCommit', obj);
    }
    /** This is description of the othAdrExecuteQuery function*/
    othAdrExecuteQuery(obj) {
        return this.http.post('oidstabs/othAdrExecuteQuery', obj);
    }
    /** This is description of the othAdrCommit function*/
    othAdrCommit(obj) {
        return this.http.post('oidstabs/othAdrCommit', obj);
    }
    /** This is description of the agyPhonesExecuteQuery function*/
    agyPhonesExecuteQuery(obj) {
        return this.http.post('oidstabs/agyPhonesExecuteQuery', obj);
    }
    /** This is description of the busPhonesExecuteQuery function*/
    busPhonesExecuteQuery(obj) {
        return this.http.post('oidstabs/busPhonesExecuteQuery', obj);
    }
    /** This is description of the othPhonesExecuteQuery function*/
    othPhonesExecuteQuery(obj) {
        return this.http.post('oidstabs/othPhonesExecuteQuery', obj);
    }
    /** This is description of the rgSubTypeRecordGroup function*/
    rgSubTypeRecordGroup() {
        return this.http.get('oidstabs/rgSubTypeRecordGroup');
    }
    /** This is description of the rgEscortRecordGroup function*/
    rgEscortRecordGroup() {
        return this.http.get('oidstabs/rgEscortRecordGroup');
    }
    /** This is description of the rgTransportRecordGroup function*/
    rgTransportRecordGroup() {
        return this.http.get('oidstabs/rgTransportRecordGroup');
    }
    /** This is description of the rgStatusRecordGroup function*/
    rgStatusRecordGroup() {
        return this.http.get('oidstabs/rgStatusRecordGroup');
    }
    /** This is description of the rgCorpLocRecordGroup function*/
    rgCorpLocRecordGroup() {
        return this.http.get('oidstabs/rgCorpLocRecordGroup');
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    rgAgyLocRecordGroup() {
        return this.http.get('oidstabs/rgAgyLocRecordGroup');
    }
    /** This is description of the rgOthLocRecordGroup function*/
    rgOthLocRecordGroup(rootOffenderId) {
        return this.http.get('oidstabs/rgOthLocRecordGroup?rootOffenderId=' + rootOffenderId);
    }
    /** This is description of the calculateDays function*/
    calculateDays(eventDate, returnDate) {
        return this.http.get('/oidstabs/calculateDays?eventDate=' + eventDate + ' &returnDate=' + returnDate);
    }
    /** This is description of the calculateHours function*/
    calculateHours(startTime, returnTime) {
        return this.http.get('/oidstabs/calculateHours?startTime=' + startTime + ' &returnTime=' + returnTime);
    }
    /** This is description of the othAdrCommit function*/
    adrLocationCommit(obj) {
        return this.http.post('oidstabs/adressLocationsCommit', obj);
    }
    checkNonAssociations(obj) {
		return this.http.post('oidstabs/checkNonAssociations', obj);
	}
    rgPurposeRecordGroup(){
        return this.http.get('oidstabs/rgPurposeRecordGroup');
    }

    offSchCheckScheduleConflict(obj) {
        return this.http.post('/oidstabs/offSchCheckScheduleConflict' ,obj);    
    }

    tapScheduleSettingExecuteQuery() {
        return this.http.get('/oidstabs/tapScheduleSettingExecuteQuery');    

    }
}
