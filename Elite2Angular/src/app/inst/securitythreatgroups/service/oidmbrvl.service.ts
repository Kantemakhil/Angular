import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OidmbrvlService {
    constructor(private http: HttpService) { }
    /** This is description of the offenderStgDetailsExecuteQuery function*/
    offenderStgDetailsExecuteQuery(obj) {
        return this.http.post('oidmbrvl/offenderStgDetailsExecuteQuery', obj);
    }
    /** This is description of the offenderStgDetailsCommit function*/
    offenderStgDetailsCommit(obj) {
        return this.http.post('oidmbrvl/offenderStgDetailsCommit', obj);
    }
    /** This is description of the rgActionRecordGroup function*/
    rgActionRecordGroup() {
        return this.http.get('oidmbrvl/rgActionRecordGroup');
    }
    /** This is description of the rgReasonRecordGroup function*/
    rgReasonRecordGroup() {
        return this.http.get('oidmbrvl/rgReasonRecordGroup');
    }
}
