import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { VNameSearch } from '@common/beans/VNameSearch';

@Injectable({providedIn: 'root'})
export class OidbsiapService {
    vNameSearch: VNameSearch;
    checkFlag: boolean;
    constructor(private http: HttpService) { }
    /** This is description of the offSchExecuteQuery function*/
    offSchExecuteQuery(obj) {
        return this.http.post('oidbsiap/offSchExecuteQuery', obj);
    }
    /** This is description of the offSchCommit function*/
    offSchCommit(obj) {
        return this.http.post('oidbsiap/offSchCommit', obj);
    }
    /** This is description of the rgSchInternalScheduleRecordGroup function*/
    rgSchInternalScheduleRecordGroup() {
        return this.http.get('oidbsiap/rgSchInternalScheduleRecordGroup');
    }
    /** This is description of the rgAgyLocRecordGroup function*/
    rgAgyLocRecordGroup() {
        return this.http.get('oidbsiap/rgAgyLocRecordGroup');
    }
    /** This is description of the rgInternalMoveLocationsRecordGroup function*/
    rgInternalMoveLocationsRecordGroup(agyLocId) {
        return this.http.get('oidbsiap/rgInternalMoveLocationsRecordGroup?agyLocId=' + agyLocId);
    }
    /** This is description of the offSchCheckScheduleConflict function*/
    offSchCheckScheduleConflict(obj) {
        return this.http.post('oidbsiap/offSchCheckScheduleConflict', obj);
    }
    checkNonAssociationOffenders(obj) {
        return this.http.post('oidbsiap/checkNonAssociationOffenders', obj);
    }

    checkNonAssociationOffendersexternal(obj){
        return this.http.post('oidbsiap/checkNonAssociationOffendersexternal', obj);
    }

    checkNonAssociationOffendersWithLivingUnit(offenderBookId,livingUnitId) {
        return this.http.get('oidsiapp/checkNonAssociationOffendersWithLivingUnit?offenderBookId='+offenderBookId+'&livingUnitId='+livingUnitId);
    }

    getnsOffenderBookId(obj){
        return this.http.post("oidbsiapp/getnsOffenderBookId",obj);
    }

}
