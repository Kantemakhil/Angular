import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtuholdrService } from '../service/otuholdr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-otuholdr',
    templateUrl: './otuholdr.component.html'
})

export class OtuholdrComponent implements OnInit {
    lastTxnId: number;
    isLoading: boolean;
    descFlag: boolean;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    constructor(private otuholdrFactory: OtuholdrService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) { }
    ngOnInit() {

        if (this.dialog && this.dialog.data && this.dialog.data.txnId) {
            this.offtxnModel = this.dialog.data;
            this.lastTxnId = this.offtxnModel.txnId;
            this.offtxnModel.txnId = null;
            this.offtxnModel.txnEntryDesc = 'Remove Hold';
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
    onExitButtonclick() {
    }
    onSaveButtonclick() {
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }

    keyCommit() {
        this.isLoading = true;
        if (!this.offtxnModel.txnEntryDesc) {
            this.show('otuholdr.descmustbeenter');
            this.isLoading = false;
            return false;
        }
        const model = JSON.parse(JSON.stringify(this.offtxnModel));
        model.txnId = this.lastTxnId;
        this.otuholdrFactory.getVHoldClearFlag(model).subscribe(data => {
            if (data === 'Y') {
                this.show('otuholdr.holdalreadyremoved');
                this.isLoading = false;
            } else if (data === 'X') {
                this.show('otuholdr.whncheckcrnthold');
                this.isLoading = false;
            } else {
                this.onInsertTrigger();
            }
        });
    }

    onInsertTrigger() {
        const model = JSON.parse(JSON.stringify(this.offtxnModel));
        model.txnId = this.lastTxnId;
        this.otuholdrFactory.onInsert(model).subscribe(data => {
            if (String(data).startsWith('otuholdr')) {
                this.show(data);
            } else if (String(data) === '0') {
                this.show('common.addupdateremoverecordfailed', 'error');
            } else {
                if (!isNaN(data)) {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    this.isLoading = true;
                    this.descFlag = true;
                    this.offtxnModel.txnId = data;
                } else {
                    if (String(data).includes('2291')) {
                    if (String(data).includes('OFF_TXN_PER_F1')) {
                        this.show('otuholdr.personidnotexit');
                    } else  if (String(data).includes('OFF_TXN_CORP_F1')) {
                        this.show('otuholdr.corportnotexit');
                    } else  if (String(data).includes('OFF_TXN_OFF_NAME_F1')) {
                        this.show('otuholdr.offendernotexit');
                    } else  if (String(data).includes('OFF_TXN_TXN_TYPE_F1')) {
                        this.show('otuholdr.txntypenotexit');
                    } else  if (String(data).includes('OFF_TXN_OFF_TXN_F1')) {
                        this.show('otuholdr.adjustnotexit');
                    } else  if (String(data).includes('OFF_TXN_OFF_TA_F1')) {
                        this.show('otuholdr.caseloadnotexit');
                    } else {
                        this.show('common.addupdateremoverecordfailed', 'error');
                    }
                }  else  if (String(data).includes('2292') && String(data).includes('40510')) {
                         if (String(data).includes('OFF_TXN_OFF_TXN_F1')) {
                            this.show('otuholdr.deletecantonofftxn');
                        } else  if (String(data).includes('OFF_RBT_OFF_TXN_F1')) {
                            this.show('otuholdr.deletecantonroomboard');
                        } else  if (String(data).includes('OFF_PRT_OFF_TXN_F1')) {
                            this.show('otuholdr.deletecantonapyroll');
                        } else  if (String(data).includes('OFF_CET_OFF_TXN_F1')) {
                            this.show('otuholdr.deletecannotoncurrency');
                        } else  if (String(data).includes('0FF_WRT_OFF_TXN_F1')) {
                            this.show('otuholdr.deletecannotonwork');
                        } else {
                            this.show('common.addupdateremoverecordfailed', 'error');
                        }
                    } else {
                    this.show('common.addupdateremoverecordfailed', 'error');
                    }
                }
            }
        });
    }
    offtxnExecuteQuery() {
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otuholdrSaveofftxnForm(event) {
    }

    txnEntryDateKeyListvalTrigger() {
    }

    holdUntilDateKeyListvalTrigger() {
    }

}
