import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OmshelpService {
constructor(private http: HttpService) { }
/** This is description of the modifyTabExecuteQuery function*/
modifyTabExecuteQuery(obj) {
return this.http.post('omshelp/modifyTabExecuteQuery', obj);
}

moduleHelpExecuteQuery(){
    return this.http.get('omshelp/moduleHelpExecuteQuery');
}
/** This is description of the modifyTabCommit function*/
moduleHelpCommit(obj) {
return this.http.post('omshelp/moduleHelpCommit', obj);
}
insertBaseUrl(obj){
    return this.http.post('omshelp/insertBaseUrl',obj);
}
urlExecuteQuery(){
    return this.http.get('omshelp/urlExecuteQuery');
}
/** This is description of the cgfkModifytabmovementtypeRecordGroup function*/ 
// not used any where 
cgfkModifytabmovementtypeRecordGroup(obj) {
return this.http.get('oumcdtab/cgfk$modifyTabMovementTypeRecordGroup');
}
    /** This is description of the cgfkModifytabmovementreasoRecordGroup function*/
    // not used any where 
cgfkModifytabmovementreasoRecordGroup(obj) {
return this.http.get('oumcdtab/cgfk$modifyTabMovementReasoRecordGroup');
}
/** This is description of the lovParentTableRecordGroup function*/
lovParentTableRecordGroup(obj) {
return this.http.get('omshelp/lovParentTableRecordGroup');
}
/** This is description of the lovTableNameRecordGroup function*/
lovTableNameRecordGroup(obj) {
return this.http.get('omshelp/lovTableNameRecordGroup');
}
/** This is description of the lovColumnNameRecordGroup function*/
lovColumnNameRecordGroup(obj) {
return this.http.get('omshelp/lovColumnNameRecordGroup');
}
/** This is description of the lovSeqNameRecordGroup function*/
lovSeqNameRecordGroup(obj) {
return this.http.get('omshelp/lovSeqNameRecordGroup');
}
}
