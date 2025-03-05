import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({
    providedIn: 'root'
})
export class OcureminService {

    constructor(private http: HttpService) { }

    updateCourtEvents(obj) {
        return this.http.post('oidcrtev/courtEventCommit', obj);
    }

    phoneNumberAndEmailCheck(offenderBookId) {
        return this.http.get(`oidcrtev/phoneNumberAndEmailCheck?offenderBookId=${offenderBookId}`);
    }

    updateCourtEventsForSanctionAndViolation(obj) {
        return this.http.post('osanvios/courtEventCommit', obj);
    }

    updateOffenderProgramAssignment(obj) {
        return this.http.post('ocdprogr/updateoffPgmProfCommit', obj);
    }

}