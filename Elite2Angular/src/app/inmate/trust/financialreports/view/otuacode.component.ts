import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtuacodeService } from '../service/otuacode.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-otuacode',
    templateUrl: './otuacode.component.html'
})

export class OtuacodeComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    accodeData: AccountCodes[] = [];
    accodeDataTemp: AccountCodes[] = [];
    accodeModel: AccountCodes = new AccountCodes();
    accodeIndex: number;
    accodeInsertList: AccountCodes[] = [];
    accodeUpdatetList: AccountCodes[] = [];
    accodeDeleteList: AccountCodes[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    acCodeColumnDef: any[];
    tableIndex = -1;
    constructor(private otuacodeFactory: OtuacodeService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.acCodeColumnDef = [];
    }
    ngOnInit() {

        this.acCodeColumnDef = [
            { fieldName: this.trMsg('otuacode.accountcode'), field: 'accountCode', editable: false, width: 150 },
            { fieldName: this.trMsg('otuacode.accountname'), field: 'accountName', editable: false, width: 150 },
        ];
        this.accodeExecuteQuery();
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onButSelectclick() {
    }
    allowNumbers(event) {
    }
    onRowClickaccode(event) {
        if (event) {
            this.accodeModel = event;
        }
    }
    accodeExecuteQuery() {
        this.accodeModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.accodeModel.caseloadType = this.sessionManager.currentCaseLoadType;
        this.accodeModel.accountName = this.dialog.data.moduleName;
        const accodeResult = this.otuacodeFactory.acCodeExecuteQuery(this.accodeModel);
        accodeResult.subscribe(data => {
            if (data.length === 0) {
                this.accodeData = [];
                this.show('common.querycaused');
                return;
            } else {
                this.accodeData = data;
                this.tableIndex = 0;
            }
        });
    }
    cancel() {
        this.dialog.close(null);
    }

    ok() {
        this.dialog.close({
            accountCode: this.accodeModel.accountCode
        });
    }

}
