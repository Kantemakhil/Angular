import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcugltrdService } from '@cf/offendertransactions/service/ocugltrd.service';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';

@Component({
    selector: 'app-ocugltrd',
    templateUrl: './ocugltrd.component.html'
})

export class OcugltrdComponent implements OnInit {
    @ViewChild('glTransDialog', {static: true}) glTransDialog: DialogComponent;
    msgs: any[] = [];
    gltxnData: GlTransactions[] = [];
    gltxnModel: GlTransactions = new GlTransactions();
    gltxnIndex = -1;
    gltxnInsertList: GlTransactions[] = [];
    gltxnUpdatetList: GlTransactions[] = [];
    gltxnDeleteList: GlTransactions[] = [];
    glTxnColumnDef: any[];
    msglist: any[];
    message: any;
    type: any;
    glTxnId: number;
    retrievedisabled: boolean;
    clearDisabled: boolean;
    disableSearchFields: boolean;
    constructor(private ocugltrdFactory: OcugltrdService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.glTxnColumnDef = [];
    }
    ngOnInit() {
        this.glTxnId = undefined;
        this.retrievedisabled = true;
        this.clearDisabled = false;
        this.disableSearchFields = true;
        this.glTxnColumnDef = [
            { fieldName: this.translateService.translate('ocugltrd.gl'), field: 'txnId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.seq'), field: 'glEntrySeq', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocugltrd.posting'), field: 'txnPostUsage', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.code'), field: 'accountCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.description'), field: 'txnEntryDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150 },
        ];
        this.gltxnExecuteQuery('onInit');
    }

    /**
      * This function displays the messages
      */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onButExitclick() {
        this.glTransDialog.close(null);
    }

    isInsertable() {
        if (this.glTxnId) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }

    cancel() {
        this.gltxnData = [];
        this.glTxnId = undefined;
        this.disableSearchFields = false;
        this.clearDisabled = true;
        this.retrievedisabled = false;
    }
    gltxnExecuteQuery(action) {
        if (action && action === 'ss' && (this.glTxnId && this.glTxnId !== this.glTransDialog.data.txnId
            || this.glTxnId === 0)) {
            this.gltxnModel.txnId = this.glTxnId;
            this.gltxnModel.txnEntrySeq = undefined;
        } else {
            this.gltxnModel.txnId = this.glTransDialog.data.txnId;
            this.gltxnModel.txnEntrySeq = this.glTransDialog.data.txnEntrySeq;
        }
        const gltxnResult = this.ocugltrdFactory.glTxnExecuteQuery(this.gltxnModel);
        gltxnResult.subscribe(gltxnResultList => {
            if (gltxnResultList.length === 0) {
                this.gltxnData = [];
                this.glTxnId = undefined;
                this.disableSearchFields = false;
                this.clearDisabled = true;
                if (action && action === 'ss') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycausedReEnter');
                    this.show();
                    return;
                }
            } else {
                this.disableSearchFields = true;
                this.clearDisabled = false;
                this.retrievedisabled = true;
                gltxnResultList.forEach(obj => {
                    obj.txnEntryAmount = obj.txnEntryAmount.toFixed(2);
                });
                this.gltxnData = gltxnResultList;
                this.gltxnModel = gltxnResultList[0];
                this.gltxnIndex = 0;
            }
        });
    }
}
