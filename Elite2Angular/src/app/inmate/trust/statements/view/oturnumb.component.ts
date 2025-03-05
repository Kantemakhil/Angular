import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OturnumbService } from '../service/oturnumb.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

import { OffenderTransactionsCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderTransactionsCommitBean';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-oturnumb',
    templateUrl: './oturnumb.component.html'

})

export class OturnumbComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnCommitModel: OffenderTransactionsCommitBean = new OffenderTransactionsCommitBean();
    offtxnIndex: number;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdatetList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offSubaColumnDef: any[];
    offTxnColumnDef: any[];
    bankCbColumnDef: any[];
    csldLimColumnDef: any[];
    tableIndex = -1;

    constructor(private oturnumbFactory: OturnumbService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.offTxnColumnDef = [];
    }
    ngOnInit() {

        this.offTxnColumnDef = [
            { fieldName: this.trMsg('oturnumb.receipt'), field: 'receiptNumber', editable: false, width: 150 },
            { fieldName: this.trMsg('oturnumb.payeename'), field: 'nbtpayeeName', editable: false, width: 150 },
            { fieldName: this.trMsg('oturnumb.offender'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.trMsg('common.name'), field: 'payeeName', editable: false, width: 150 },
        ];
        if (this.dialog && this.dialog.data) {
            const data = this.dialog.data;
            const reqData = {};
            reqData['agyLocId'] = data.agyLocId;
            reqData['txnUsage'] = data.txnUsage;
            reqData['createUserId'] = data.createUserId;
            reqData['receiptNumber'] = data.nbtPersonIdOne;
            reqData['caseloadId'] = this.sessionManager.currentCaseLoad;
            this.offtxnExecuteQuery(reqData);
        }

    }
    /**
     * This function displays the messages
     */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    offtxnExecuteQuery(reqData) {
        this.tableIndex = -1;
        const offtxnResult = this.oturnumbFactory.offTxnExecuteQuery(reqData);
        offtxnResult.subscribe(data => {
            if (data.length === 0) {
                this.offtxnData = [];
                this.show('common.querycaused');
            } else {
                this.offtxnData = data;
                this.offtxnModel = data[0];
                this.tableIndex = 0;
            }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oturnumbSaveofftxnForm(event) {
        this.offtxnInsertList = event.added;
        this.offtxnUpdatetList = event.updated;
        this.offtxnDeleteList = event.removed;
        this.offtxnCommitModel.insertList = [];
        this.offtxnCommitModel.updateList = [];
        this.offtxnCommitModel.deleteList = [];
        if (this.offtxnInsertList.length > 0) {
            for (let i = 0; i < this.offtxnInsertList.length; i++) {
            }
            this.offtxnCommitModel.insertList = this.offtxnInsertList;
            if (this.offtxnUpdatetList.length > 0) {
                for (let i = 0; i < this.offtxnUpdatetList.length; i++) {
                }
                this.offtxnCommitModel.updateList = this.offtxnUpdatetList;
            }
            if (this.offtxnDeleteList.length > 0) {
                for (let i = 0; i < this.offtxnDeleteList.length; i++) {
                }
                this.offtxnCommitModel.deleteList = this.offtxnDeleteList;
            }
            const offtxnSaveData = this.oturnumbFactory.offTxnCommit(this.offtxnCommitModel);
            offtxnSaveData.subscribe(data => {
            });
        }
    }

    onRowClickofftxn(event) {
        if (event) {
            this.offtxnModel = event;
        } else {
            this.offtxnModel = new OffenderTransactions();
        }
    }
    get selectFlag(): boolean {
        if (this.offtxnData.length > 0) {
            return false;
        } else {
            return true;
        }
    }
}


