import { Component, OnInit,
 ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuiausesService } from '../service/ouiauses.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SysTagAuditFormGetsessiondetail } from '../beans/SysTagAuditFormGetsessiondetail';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
// import required bean declarations

@Component({
selector: 'app-ouiauses',
    templateUrl: './ouiauses.component.html'
})

export class OuiausesComponent implements OnInit {
    // Variable declaration
    actionName: string;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    getsessiondetailData: SysTagAuditFormGetsessiondetail [] = [];
    getsessiondetailDataTemp: SysTagAuditFormGetsessiondetail[] = [];
    // TODO angular.copy(this.getsessiondetailData, thisgetsessiondetailDataTemp);
    getsessiondetailModel: SysTagAuditFormGetsessiondetail = new SysTagAuditFormGetsessiondetail();
    getsessiondetailIndex: number;
    getsessiondetailInsertList: SysTagAuditFormGetsessiondetail[] = [];
    getsessiondetailUpdatetList: SysTagAuditFormGetsessiondetail[] = [];
    getsessiondetailDeleteList: SysTagAuditFormGetsessiondetail[] = [];
    getSessionDetailColumnDef: any[];
    msglist: any[];
    message: any;
    type: any;
    sqlText: string;
    sessionId: string;
    staffMember: string;
    selectedRow: number;
    gridDisable: boolean;
    constructor(private ouiausesFactory: OuiausesService , public translateService: TranslateService,
    public sessionManager: UserSessionManager) {

    this.getSessionDetailColumnDef = [];

    }
ngOnInit() {
    this.getSessionDetailColumnDef = [
       { fieldName: this.translateService.translate('common.date'), field: 'date',
          datatype: 'date', editable: false, width: 150},
       { fieldName: this.translateService.translate('common.time'), field: 'time',
          datatype: 'text', editable: false, width: 150},
        { fieldName: this.translateService.translate('ouiauses.tableName'), field: 'objectName', editable: false, width: 150},
        { fieldName: this.translateService.translate('ouiauses.statementType'), field: 'statementType', editable: false, width: 150},
        { fieldName: this.translateService.translate('ouiauses.scn'), field: 'scn', editable: false, width: 150},
       { fieldName: this.translateService.translate('ouiauses.sqlBindValues'), field: 'sqlBind', maxlength: '2000',
        editable: false, width: 150},
   ];

   this.sessionId = this.dialog.data.sessionId;
   this.staffMember = this.dialog.data.staffName;

   this.gridDisable = false;

   this.getsessiondetailModel.sessionid = Number(this.sessionId);
   this.getsessiondetailExecuteQuery();
}

show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
}

onButGetBack() {
    this.dialog.close(null);
}

onRowClickgetsessiondetail(event) {
   this.sqlText = event.sqlText;
}

getsessiondetailExecuteQuery() {

    const getsessiondetailResult = this.ouiausesFactory.getSessionDetailExecuteQuery(this.getsessiondetailModel);
        getsessiondetailResult.subscribe(data => {
            if (data.length === 0) {
                this.getsessiondetailData = [];
            } else {
                this.getsessiondetailData = data;
                this.getsessiondetailModel = data[0];
                this.selectedRow = 0;
            }
        });
    }

savealertForm(event) {

}

onGridInsert = () => {

}
onGridDelete = () => {

}

onGridClear = () => {

}

validateRowData = () => {

}

}
