import { OffenderTransactions } from './../../../inmate/trust/trustaccounts/beans/OffenderTransactions';
import { OffenderDeductionsCommitBean } from '@inmate/trust/deductions/beans/OffenderDeductionsCommitBean';
import { OffenderDeductions } from './../../../inmate/trust/trustaccounts/beans/OffenderDeductions';
import { ValidateRowReturn } from './../../../inst/booking/maintainence/view/oimprfca.component';
import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcudpdisService } from '../service/ocudpdis.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
// import required bean declarations

@Component({
    selector: 'app-ocudpdis',
    templateUrl: './ocudpdis.component.html'
    // styleUrls: ['./ocudpdis.component.css']
})

export class OcudpdisComponent implements OnInit {
    @ViewChild('ocudpdisDialog', {static: true}) ocudpdisDialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    saveDisabled = false;
    editable = true;
    tbdDeductionsReadOnly = false;
    toolbarReadOnly = false;
    caseLoadId: string;
    offenderId: number;
    balance: number;
    tbddeductionsModel: OffenderDeductions = new OffenderDeductions();
    tbddeductionsResult: OffenderDeductions = new OffenderDeductions();
    tbdTransactionModel: OffenderTransactions = new OffenderTransactions();
    tbdComittModel: OffenderDeductionsCommitBean = new OffenderDeductionsCommitBean();
    type: string;
    message: string;
    txnId: number;
    infoNumber: any;
    constructor(private ocudpdisFactory: OcudpdisService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        private amountFormat: AmountFormatUtil) {
        // TODO initilize data members here..!
    }
    ngOnInit() {
        // this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.caseLoadId = this.ocudpdisDialog.data.caseloadId;
        this.offenderId = this.ocudpdisDialog.data.offenderId;
        this.infoNumber = this.ocudpdisDialog.data.informationNumber;
        this.tbdExecuteQuery();
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
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
    /**
       * This function will be called when clicked on exit button to exit the screen
       */
    onButExitclick() {
        this.ocudpdisDialog.close(null);
    }

    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }
    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.tbddeductionsModel.amount)) {
            event.stopPropagation();
            return false;
        }
    }
    /**
        * This function will be called when clicked on save button to save the data
        */
    tbdComitt() {
        if (!this.tbdComittValidations()) {
            return;
        }
        this.tbdComittModel.insertList = [];
        this.tbdComittModel.updateList = [];
        this.tbddeductionsModel.informationNumber = this.infoNumber;
        this.tbdComittModel.insertList.push(this.tbddeductionsModel);
        const tdsSaveData = this.ocudpdisFactory.tbdCommit(this.tbdComittModel);
        tdsSaveData.subscribe(data => {
            if (data) {
                if (data.sealFlag === '1') {
                    this.show(this.translateService.translate('ocudpdis.txttyperrmsg'));
                } else if (data.sealFlag === '2') {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'));

                } else {
                    this.tbdTransactionModel = data;
                    this.txnId = this.tbdTransactionModel.txnId;
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.saveDisabled = true;
                }

            }
        });

    }
    /**
        * This function will be used to retrive the data
        */
    tbdExecuteQuery() {
        this.tbddeductionsModel.offenderId = this.offenderId;
        this.tbddeductionsModel.caseloadId = this.caseLoadId;

        const tbdResult = this.ocudpdisFactory.
            tbdExecuteQuery(this.tbddeductionsModel);
        tbdResult.subscribe(data => {
            if (!data.txnType) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocudpdis.txttypeerror');
                this.show(this.message);
                this.tbddeductionsModel = new OffenderDeductions();
                this.saveDisabled = true;
            } else {
                this.tbddeductionsModel = data;
                if (this.tbddeductionsModel && (this.tbddeductionsModel.amount ||
                     this.tbddeductionsModel.amount === 0 || this.tbddeductionsModel.amount === null) ) {
                    data.amount = Number(data.amount).toFixed(2);
                    this.tbddeductionsModel.amount = data.amount;
                this.balance = this.tbddeductionsModel.amount;
                this.saveDisabled = false;
                }
            }
        });
    }
    /**
        * This function will be used to validations
        */
    tbdComittValidations() {
        const is = { valid: true };
        if (!this.tbddeductionsModel.amount) {
            this.show(this.translateService.translate('ocudpdis.amounterror'));
            is.valid = false;
            return;
        }
        if (Number(this.tbddeductionsModel.amount) === 0) {
            this.show(this.translateService.translate('ocudpdis.amountcannotzero'));
            is.valid = false;
            return;
        }
        if (Number(this.balance) === 0) {
            this.show(this.translateService.translate('ocudpdis.zerobalanceerror'));
            is.valid = false;
            return;
        }
        if (this.tbddeductionsModel.amount && Number(this.tbddeductionsModel.amount) > Number(this.balance)) {
            this.message = this.translateService.translate('ocudpdis.balanceerror') + this.balance;
            this.show(this.message);
            is.valid = false;
            return;
        }


        return is.valid;
    }

}
