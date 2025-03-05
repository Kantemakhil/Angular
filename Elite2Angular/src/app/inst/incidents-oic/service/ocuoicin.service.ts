import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable({providedIn: 'root'})
export class OcuoicinService {
    imagesDataTemp = new Images();
constructor(private http: HttpService) {}
/** This is description of the oicInvestExecuteQuery function*/
oicInvestExecuteQuery(obj) {
 return this.http.post('ocuoicin/oicInvestExecuteQuery', obj);
}
/** This is description of the oicInvestCommit function*/
oicInvestCommit(obj) {
 return this.http.post('ocuoicin/oicInvestCommit', obj);
}
/** This is description of the oicInvestStaExecuteQuery function*/
oicInvestStaExecuteQuery(obj) {
 return this.http.post('ocuoicin/oicInvestStaExecuteQuery', obj);
}
/** This is description of the oicInvestStaCommit function*/
oicInvestStaCommit(obj) {
 return this.http.post('ocuoicin/oicInvestStaCommit', obj);
}
/** This is description of the rgStatementTypeRecordGroup function*/
rgStatementTypeRecordGroup(obj) {
 return this.http.get( 'ocuoicin/rgStatementTypeRecordGroup');
}
/** This is description of the rgAgyIncpStaffIdRecordGroup function*/
rgAgyIncpStaffIdRecordGroup(caseLoadId) {
 return this.http.get( 'ocuoicin/rgAgyIncpStaffIdRecordGroup?caseloadId=' + caseLoadId);
}
/** This is description of the oicInvestOnCheckDeleteMasteroic_invest_sta_cur function*/
oicInvestOnCheckDeleteMasteroic_invest_sta_cur(obj) {
 return this.http.get( 'ocuoicin/oicInvestOnCheckDeleteMasteroicInvestStaCur');
}
}
