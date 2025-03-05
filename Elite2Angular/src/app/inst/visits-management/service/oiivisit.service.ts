import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiivisitService {
    constructor( private http: HttpService ) { }
    /** This is description of the offVisExecuteQuery function*/
    offVisExecuteQuery( obj ) {
        return this.http.post( 'oiivisit/offVisExecuteQuery', obj );
    }
    /** This is description of the offImpExecuteQuery function*/
    offImpExecuteQuery( obj ) {
        return this.http.post( 'oiivisit/offImpExecuteQuery', obj );
    }
    /** This is description of the offImpCommit function*/
    offImpCommit( obj ) {
        return this.http.post( 'oiivisit/offImpCommit', obj );
    }
    

    rgAgyLocationsRecordGroup(obj) {
        return this.http.get('oiivisit/rgAgyLocationsRecordGroup?caseloadId=' + obj);
    }

    offenderVisitsSaveForm(obj) {
        return this.http.post('oiivisit/offenderVisitsSaveForm', obj);
    }

    rgVisitLocationWithoutDay(obj) {
        return this.http.get('oiivisit/rgVisitLocationWithoutDay?agyLocId=' + obj);
    }

    rgAgyVisitDayOfWeekRecordGroup(obj) {
        return this.http.get('oiivisit/rgAgyVisitDayOfWeekRecordGroup?agyLocId=' + obj);
    }

    rgAgyVisitTimesRecRecordGroup(obj1,obj2) {
        return this.http.get('oiivisit/rgAgyVisitTimesRecRecordGroup?agyLocId=' + obj1 + '&weekDay=' + obj2);
    }

    rgAgyVisitSlotsRecRecordGroup(obj1,obj2,obj3) {
        return this.http.get('oiivisit/rgAgyVisitSlotsRecRecordGroup?agyLocId=' + obj1 + '&weekDay=' + obj2 + '&timeSlotSeq=' + obj3);
    }
}
