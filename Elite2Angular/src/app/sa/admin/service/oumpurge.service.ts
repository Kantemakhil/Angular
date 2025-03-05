import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumpurgeService {
    constructor(private http: HttpService) { }
    /** This is description of the offExecuteQuery function*/
    offExecuteQuery(obj) {
        return this.http.post('oumpurge/offExecuteQuery', obj);
    }
    /** This is description of the offCommit function*/
    offCommit(obj) {
        return this.http.post('oumpurge/offCommit', obj);
    }
    /** This is description of the offBkgExecuteQuery function*/
    offBkgExecuteQuery(obj) {
        return this.http.post('oumpurge/offBkgExecuteQuery', obj);
    }
    /** This is description of the offBkgCommit function*/
    offBkgCommit(obj) {
        return this.http.post('oumpurge/offBkgCommit', obj);
    }

    getLvCountSealBookings(rootOffenderId: number) {
        return this.http.get('oumpurge/getLvCountSealBookings?rootOffenderId=' + rootOffenderId);
    }

    purgeOffenderCommit(obj) {
        return this.http.post('oumpurge/purgeOffenderCommit', obj);
    }

    checkActiveBooking(obj) {
        return this.http.get('oumpurge/checkActiveBooking', obj);
    }

    whenTimerExpired(obj) {
        return this.http.post('oumpurge/whenTimerExpired', obj);
    }

    getSealButtonAccessPermission() {
		return this.http.get('oumpurge/getSealButtonAccessPermission');
	}
}
