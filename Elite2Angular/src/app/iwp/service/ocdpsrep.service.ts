import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdpsrepService {
constructor(private http: HttpService) { }
ordExecuteQuery(obj) {
return this.http.get('ocdpsrep/ordExecuteQuery?offenderBookId=' + obj);
}

ordProposalsExecuteQuery(obj) {
return this.http.get('ocdpsrep/ordProposalsExecuteQuery?orderId=' + obj);
}

ordPropCondsExecuteQuery(obj) {
return this.http.post('ocdpsrep/ordPropCondsExecuteQuery', obj);
}

ordPpslCondActExecuteQuery(obj) {
return this.http.get('ocdpsrep/ordPpslCondActExecuteQuery?orderProposalConditionId=' + obj);
}

ordCommit(obj) {
return this.http.post('ocdpsrep/ordCommit', obj);
}

ordProposalsCommit(obj) {
return this.http.post('ocdpsrep/ordProposalsCommit', obj);
}
ordPropCondsCommit(obj) {
return this.http.post('ocdpsrep/ordPropCondsCommit', obj);
}

ordPpslCondActCommit(obj) {
return this.http.post('ocdpsrep/ordPpslCondActCommit', obj);
}

    ordHistoryExecuteQuery(orderId: number) {
        return this.http.get('ocdpsrep/ordHistoryExecuteQuery?orderId=' + orderId);
    }

    rgAccreditedProgramsRecordGroup() {
        return this.http.get('ocdpsrep/rgAccreditedProgramsRecordGroup');
    }

    ordAuthorCommit(obj) {
        return this.http.post('ocdpsrep/ordAuthorCommit', obj);
    }

    loadData(retData: any) {
        return this.http.post('ocmpconf/getFormData', retData);
    }

    chargesExecuteQuery(obj) {
        return this.http.post('ocdpsrep/chargesExecuteQuery', obj);
    }

    chargesCommit(obj) {
        return this.http.post('ocdpsrep/chargesCommit', obj);
    }
}
