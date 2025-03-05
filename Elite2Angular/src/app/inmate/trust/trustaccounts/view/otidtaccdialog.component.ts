import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef, ViewChild
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OtidtaccService } from '../service/otidtacc.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
@Component({
    selector: 'app-otidtaccdialog',
    templateUrl: './otidtaccdialog.component.html'
})

export class OtidtaccdialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    offtxnData: OffenderTransactions [] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnIndex = -1;
    offTxnColumnDef: any[];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    offenderIdDisplay: any;
    bookingNo: any;
    lastFirstName: any;
    accountCurrentBal: any;
    accountHoldBal: any;
    constructor(public translateService: TranslateService,
         public dialogService: DialogService,
         private otidtaccFactory: OtidtaccService,
         private sessionManager: UserSessionManager,
         private amountFormat: AmountFormatUtil) {
             this.offTxnColumnDef = [];
    }
    ngOnInit() {
        this.accountCurrentBal = undefined;
        this.accountHoldBal = undefined;
        this.offenderIdDisplay = this.dialog.data.txnType;
        this.bookingNo = this.dialog.data.receiptNumber;
        this.lastFirstName = this.dialog.data.sealFlag;
        this.offTxnColumnDef = [
            { fieldName: this.translateService.translate('common.date'), field: 'txnEntryDate', datatype: 'date',
             editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.subacc'), field: 'subAccountType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.txntype'), field: 'txnType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.transactiondescription'), field: 'txnEntryDesc',
             editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150,datatype: 'text', format: '1.2-2',rightAlign: true },
            { fieldName: this.translateService.translate('otidtacc.current'), field: 'currentBalance', editable: false, width: 150,datatype: 'number', format: '1.2-2' ,rightAlign: true},
            { fieldName: this.translateService.translate('common.hold'), field: 'holdBalance', editable: false, width: 150,datatype: 'number', format: '1.2-2' ,rightAlign: true},
            { fieldName: this.translateService.translate('otidtacc.posting'), field: 'butDateList', link: '/OTUGLTRD',
             datatype: 'launchbutton', editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: 75},
        ];
        this.offtxnExecuteQuery();
    }
    /**
     * Method is used to get the data from DB and displays the data in The grid.
     */
    offtxnExecuteQuery() {
        this.offtxnModel = new OffenderTransactions();
        this.offtxnModel.offenderId = this.dialog.data.offenderId;
        this.offtxnModel.caseloadId = this.dialog.data.caseloadId;
        this.offtxnModel.currentCaseLoad = this.sessionManager.currentCaseLoad;
             const offtxnResult = this.otidtaccFactory.offTxnExecuteQuery(this.offtxnModel);
                 offtxnResult.subscribe(offtxnResultList => {
                if (offtxnResultList.length === 0) {
                    this.offtxnData = [];
                } else {
                    this.offtxnData = [];
                    for (let i = 0; i < offtxnResultList.length; i++) {
                        offtxnResultList[i].butDateList = '...';
                        offtxnResultList[i].receiptPrintedFlag = offtxnResultList[i].receiptPrintedFlag === 'Y' ? true : false;
                        offtxnResultList[i].payRollId = offtxnResultList[i].payRollId !== 0 ? offtxnResultList[i].payRollId : undefined;
                        offtxnResultList[i].payeeId = offtxnResultList[i].payeeId !== 0 ? offtxnResultList[i].payeeId : undefined;
                        offtxnResultList[i].currentBalance = Number(offtxnResultList[i].currentBalance).toFixed(2);
                        if (offtxnResultList[i].currentBalance < 0) {
                            offtxnResultList[i].currentBalance = '<' +
                             Math.abs(Number(offtxnResultList[i].currentBalance)).toFixed(2) + '>';
                        }
                        offtxnResultList[i].txnEntryAmount = Number(offtxnResultList[i].txnEntryAmount).toFixed(2);
                        offtxnResultList[i].holdBalance = offtxnResultList[i].holdBalance !== null ?
                         Number(offtxnResultList[i].holdBalance).toFixed(2) : Number(0.00).toFixed(2);
                        if (offtxnResultList[i].txnPostingType === 'DR') {
                            if (String(offtxnResultList[i].txnEntryAmount).startsWith('-')) {
                            offtxnResultList[i].txnEntryAmount =
                            '<' + Math.abs(Number(offtxnResultList[i].txnEntryAmount)).toFixed(2) + '>';
                            }

                        }
                        if (String(offtxnResultList[i].holdBalance).startsWith('-')) {
                            offtxnResultList[i].holdBalance =
                            '<' + Math.abs(Number(offtxnResultList[i].holdBalance)).toFixed(2) + '>';
                            }

                    }
                    this.accountCurrentBal = this.amountFormat.amountFormat(this.dialog.data.currentBalance);
                    this.accountHoldBal = this.amountFormat.amountFormat(this.dialog.data.holdNumber);
                    this.offtxnData = offtxnResultList;
                    this.offtxnModel = this.offtxnData[0];
                    this.offtxnIndex = 0;
                }
            });
    }
    /**
     * event is fired when click on the row in Grid.
     * @param event
     */
    onRowClickOnOffenderTransactions(event) {
        if (event) {
            this.offtxnModel = new OffenderTransactions();
            this.offtxnModel = event;
            if (!this.offtxnModel.payeeId) {
                this.offtxnModel.payeeName = null;

            }

        }

    }
    /**
     * event is fired when click on Previous Page Button.
     */
    otidtaccDialogClose() {
        this.dialog.close(null);
    }
}


