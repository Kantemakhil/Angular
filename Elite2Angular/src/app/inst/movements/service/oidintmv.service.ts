import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { VNameSearch } from '@common/beans/VNameSearch';

@Injectable({providedIn: 'root'})
export class OidintmvService {
    intmovectrlModel: VOffenderAllSchedules;
    offblkData: VOffenderAllSchedules[] = [];
    vNameSearch: VNameSearch;
    constructor(private http: HttpService) { }
    /** This is description of the offBlkExecuteQuery function*/
    offBlkExecuteQuery(obj) {
        return this.http.post('oidintmv/offBlkExecuteQuery', obj);
    }
    /** This is description of the offBlkCommit function*/
    offBlkCommit(obj) {
        return this.http.post('oidintmv/offBlkCommit', obj);
    }
    /** This is description of the rgEstablishmentRecordGroup function*/
    rgEstablishmentRecordGroup(obj) {
        return this.http.get('oidintmv/rgEstablishmentRecordGroup');
    }
    /** This is description of the rgMovementTypeRecordGroup function*/
    rgMovementTypeRecordGroup(obj) {
        return this.http.get('oidintmv/rgMovementTypeRecordGroup');
    }
    /** This is description of the rgFromHlocLevel1RecordGroup function*/
    rgFromHlocLevel1RecordGroup(obj) {
        return this.http.get('oidintmv/rgFromHlocLevel1RecordGroup?agyLocId=' + obj);
    }
    /** This is description of the rgFromHlocLevel2RecordGroup function*/
    rgFromHlocLevel2RecordGroup(obj, event) {
        return this.http.get('oidintmv/rgFromHlocLevel2RecordGroup?agyLocId=' + obj + '&fromLocLevelOne=' + event);
    }
    /** This is description of the rgFromHlocLevel3RecordGroup function*/
    rgFromHlocLevel3RecordGroup(obj, event) {
        return this.http.get('oidintmv/rgFromHlocLevel3RecordGroup?agyLocId=' + obj + '&fromLocLevelTwo=' + event);
    }
    /** This is description of the rgFromIlocLevel1RecordGroup function*/
    rgFromIlocLevel1RecordGroup(obj) {
        return this.http.get('oidintmv/rgFromIlocLevel1RecordGroup?agyLocId=' + obj);
    }
    /** This is description of the rgFromIlocLevel2RecordGroup function*/
    rgFromIlocLevel2RecordGroup(agyLocId, fromILocLevelOneId) {
        return this.http.get('oidintmv/rgFromIlocLevel2RecordGroup?agyLocId=' + agyLocId + '&fromILocLevelOneId=' + fromILocLevelOneId);
    }
    /** This is description of the rgFromIlocLevel3RecordGroup function*/
    rgFromIlocLevel3RecordGroup(agyLocId, fromILocLevelTwoId) {
        return this.http.get('oidintmv/rgFromIlocLevel3RecordGroup?agyLocId=' + agyLocId + '&fromILocLevelTwoId=' + fromILocLevelTwoId);
    }
    /** This is description of the rgToIlocLevel1RecordGroup function*/
    rgToIlocLevel1RecordGroup(agyLocId, fromILocLevelOneId, fromHLocLevelOne) {
        return this.http.get('oidintmv/rgToIlocLevel1RecordGroup?agyLocId=' + agyLocId + '&fromILocLevelOneId=' + fromILocLevelOneId +
            '&fromHLocLevelOne=' + fromHLocLevelOne);
    }
    /** This is description of the rgToIlocLevel2RecordGroup function*/
    rgToIlocLevel2RecordGroup(agyLocId, toILocLevelOneId) {
        return this.http.get('oidintmv/rgToIlocLevel2RecordGroup?agyLocId=' + agyLocId + '&toILocLevelOneId=' + toILocLevelOneId);
    }
    /** This is description of the rgToIlocLevel3RecordGroup function*/
    rgToIlocLevel3RecordGroup(agyLocId, toILocLevelTwoId) {
        return this.http.get('oidintmv/rgToIlocLevel3RecordGroup?agyLocId=' + agyLocId + '&toILocLevelTwoId=' + toILocLevelTwoId);
    }
    /** This is description of the rgSchTypeRecordGroup function*/
    rgSchTypeRecordGroup(obj) {
        return this.http.get('oidintmv/rgSchTypeRecordGroup');
    }
    /** This is description of the rgSchReasonRecordGroup function*/
    rgSchReasonRecordGroup(obj) {
        return this.http.get('oidintmv/rgSchReasonRecordGroup');
    }
    /** This is description of the getLabels function*/
    getLabels(obj) {
        return this.http.get('oidintmv/getLabels?agyLocId=' + obj);
    }
    isOffenderExists(obj) {
        return this.http.get('oidintmv/isOffenderExists?offIdDisplay=' + obj);
    }
    getOffenderFullDetails(obj) {
        return this.http.post('oidintmv/getOffenderFullDetails', obj);
    }

    intLocExecuteQuery(obj) {
        return this.http.post('oidintmv/intLocExecuteQuery', obj);
    }
    /** This is description of the intLocCommit function*/
    intLocCommit(obj) {
        return this.http.post('oidintmv/intLocCommit', obj);
    }
    /** This is description of the rgUsagesRecordGroup function*/
    rgUsagesRecordGroup() {
        return this.http.get('oidintmv/rgUsagesRecordGroup');
    }
}
