import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';

@Injectable()
export class OcuoscpvService {
            constructor(private http: HttpService) { }
            /** This is description of the crsActExecuteQuery function*/
            crsActExecuteQuery(obj) {
                        return this.http.post('ocuoscpv/crsActExecuteQuery', obj);
            }
            /** This is description of the crsScheduleRulExecuteQuery function*/
            crsScheduleRulExecuteQuery(obj) {
                        return this.http.post('ocuoscpv/crsScheduleRulExecuteQuery', obj);
            }
            copyFromProviderAvailability(obj) {
                return this.http.post('ocuoscpv/copyfromprovideravailability', obj);
    }
            /** This is description of the offSchExecuteQuery function*/
            offSchExecuteQuery(obj) {
                        return this.http.post('ocuoscpv/offSchExecuteQuery', obj);
            }
            /** This is description of the offSchCommit function*/
            offSchCommit(obj) {
                        return this.http.post('ocuoscpv/offSchCommit', obj);
            }
            /** This is description of the weeklyDefExecuteQuery function*/
            weeklyDefExecuteQuery(obj) {
                        return this.http.post('ocuoscpv/weeklyDefExecuteQuery', obj);
            }
            /** This is description of the weeklyDefCommit function*/
            weeklyDefCommit(obj) {
                        return this.http.post('ocuoscpv/weeklyDefCommit', obj);
            }
            weeklyDefGettingStartDate(obj){
                return this.http.post('ocuoscpv/weeklyDefgettingdate', obj);
            }
            /** This is description of the offSchDefExecuteQuery function*/
            offSchDefExecuteQuery(obj) {
                        return this.http.post('ocuoscpv/offSchDefExecuteQuery', obj);
            }
            /** This is description of the offSchDefCommit function*/
            offSchDefCommit(obj) {
                        return this.http.post('ocuoscpv/offSchDefCommit', obj);
            }
            offSchGettingWeekDay(obj) {
                        return this.http.post('ocuoscpv/offschGettingWeekDay', obj);
            }
            offSchCheckScheduleConflict(obj) {
                return this.http.post('ocuoscpv/offSchCheckScheduleConflict', obj);
            }
            /** This is description of the offPrgProfilesExecuteQuery function*/
            offPrgProfilesExecuteQuery(obj) {
                        return this.http.post('ocuoscpv/offPrgProfilesExecuteQuery', obj);
            }
            /** This is description of the offPrgProfilesCommit function*/
            offPrgProfilesCommit(obj) {
                        return this.http.post('ocuoscpv/offPrgProfilesCommit', obj);
            }
            /** This is description of the rgViewRecordGroup function*/
            rgViewRecordGroup(obj) {
                        return this.http.get('ocuoscpv/rgViewRecordGroup');
            }
}
