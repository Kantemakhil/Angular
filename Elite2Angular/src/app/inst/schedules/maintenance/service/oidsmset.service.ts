import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { SchMovSettingCommitBean } from '../beans/SchMovSettingCommitBean';

@Injectable({providedIn: 'root'})
export class OidsmsetService {
    
    constructor(private http: HttpService) { }

    tapScheduleSettingCommit(obj: SchMovSettingCommitBean) {
        return this.http.post('/oidsmset/tapScheduleSettingCommit', obj);
    }
    tapScheduleSettingExecuteQuery() {
        return this.http.get('/oidsmset/tapScheduleSettingExecuteQuery');
    }       
}
