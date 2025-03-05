import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcmschrcService {
        serviceObj: any;

        getHolidayFlag(crsactModel: any) {
        return this.http.post('ocmschrc/getHolidayFlag', crsactModel);
        }

        crsschedulerulExecuteQuery(crsact: any) {
        return this.http.post('ocmschrc/crsScheduleRulExecuteQuery', crsact);
        }

        crsschedulerulCommit(crsschedulerulCommitModel: any) {
        return this.http.post('ocmschrc/crsScheduleRulCommit', crsschedulerulCommitModel);
        }

        buildRecurringSchedule(crsschedulerulModel: any) {
        return this.http.post('ocmschrc/buildSchedule', crsschedulerulModel);
        }

        getPrgSrvDetails(programId: any) {
        return this.http.post('ocmschrc/getPrgSrvDetails', programId);
        }

        getProfileValues() {
        return this.http.post('ocmschrc/getProfileValues', {});
        }

        constructor(private http: HttpService) {}

}
