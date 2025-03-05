import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';

@Injectable()
export class OumcdtabService {
constructor(private http: HttpService) { }
/** This is description of the modifyTabExecuteQuery function*/
modifyTabExecuteQuery(obj) {
return this.http.post('oumcdtab/modifyTabExecuteQuery', obj);
}
/** This is description of the modifyTabCommit function*/
modifyTabCommit(obj) {
return this.http.post('oumcdtab/modifyTabCommit', obj);
}
/** This is description of the cgfkModifytabmovementtypeRecordGroup function*/
cgfkModifytabmovementtypeRecordGroup(obj) {
return this.http.get('oumcdtab/cgfk$modifyTabMovementTypeRecordGroup');
}
/** This is description of the cgfkModifytabmovementreasoRecordGroup function*/
cgfkModifytabmovementreasoRecordGroup(obj) {
return this.http.get('oumcdtab/cgfk$modifyTabMovementReasoRecordGroup');
}
/** This is description of the lovParentTableRecordGroup function*/
lovParentTableRecordGroup(obj) {
return this.http.get('oumcdtab/lovParentTableRecordGroup');
}
/** This is description of the lovTableNameRecordGroup function*/
lovTableNameRecordGroup(obj) {
return this.http.get('oumcdtab/lovTableNameRecordGroup');
}
/** This is description of the lovColumnNameRecordGroup function*/
lovColumnNameRecordGroup(obj) {
return this.http.get('oumcdtab/lovColumnNameRecordGroup');
}
/** This is description of the lovSeqNameRecordGroup function*/
lovSeqNameRecordGroup(obj) {
return this.http.get('oumcdtab/lovSeqNameRecordGroup');
}
}
