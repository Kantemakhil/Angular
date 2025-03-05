import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { WlNonOffSpecificTasksCommitBean } from '../beans/WlNonOffSpecificTasksCommitBean';
@Injectable({ providedIn: 'root' })
export class OcmdspwdService {

    constructor(private http: HttpService) { }

    maintainDefStaffPosWL(nonOffSpeTasksCommitBean: WlNonOffSpecificTasksCommitBean) {
        return this.http.post('ocmdspwd/maintainDefStaffPosWL', nonOffSpeTasksCommitBean);
    }

    assStartingDefWLUnitsExecuteQuery() {
        return this.http.get('ocmdspwd/assStartingDefWLUnitsExecuteQuery');
    }

    nonOffSpecTaskPosExecuteQuery(obj) {
        return this.http.post('ocmdspwd/nonOffSpecTaskPosExecuteQuery', obj);
    }
}