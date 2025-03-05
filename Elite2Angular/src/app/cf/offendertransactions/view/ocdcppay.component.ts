import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdcppayService } from '../service/ocdcppay.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderCreditPriorPayments } from '../beans/OffenderCreditPriorPayments';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

// import required bean declarations

@Component({
    selector: 'app-ocdcppay',
    templateUrl: './ocdcppay.component.html'
})

export class OcdcppayComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    // Variable declaration
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
    editable: Boolean = true;
    offCppReadOnly: Boolean = false;
    offcppModel: OffenderCreditPriorPayments = new OffenderCreditPriorPayments();
    constructor(private ocdcppayFactory: OcdcppayService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService, private amountFormat: AmountFormatUtil) {
        // TODO initilize data members here..!
    }
    ngOnInit() {
        this.offcppModel.paymentDate = DateFormat.getDate();
        // TODO all initializations here
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
      * event is fired when click on Exit button.
      */
     onButExitclick() {
        this.dialog.close(null);
    }
    onAmountBlur(amount) {
        this.amountFormat.precisionFlot(amount);
    }
    amountKeyDown(event, comp) {
        if (!this.amountFormat.avoidKeys(event, this.offcppModel.paymentAmount)) {
              event.stopPropagation();
              return false;
        }
    }
    validateAmount(event) {
        setTimeout(ele => {
              if (event) {
                    if (Number(this.offcppModel.paymentAmount) === 0) {
                        this.show(this.translateService.translate('ocdcppay.amountmandatory'), 'warn');
                        this.offcppModel.paymentAmount = undefined;
                        return;
                    }
                        if (Number(this.offcppModel.paymentAmount) >= 1000000000) {
                            this.show(this.translateService.translate('common.fieldmustbeofform'));
                            this.offcppModel.paymentAmount = undefined;
                            return;
                        }
                }
        });
     }
    openChildScreen = () => {
        this.offcppModel.offenderId = this.dialog.data.offenderId;
        this.offcppModel.moduleName = 'OCDCPPAY';
        this.offcppModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.offcppModel.receiptAmount = this.offcppModel.paymentAmount;
        if (Number(this.offcppModel.paymentAmount) < 0) {
            this.show(this.translateService.translate('ocdcppay.lessthanzerovalidation'), 'warn');
            return;
        } else if (this.offcppModel.paymentAmount === undefined) {
            this.show(this.translateService.translate('ocdcppay.amountmandatory'), 'warn');
            return;
        } else if (this.offcppModel.location === undefined || this.offcppModel.location === '') {
            this.show(this.translateService.translate('ocdcppay.locationmandatory'), 'warn');
            return;
        } else {
            this.dialogService.openLinkDialog('/OCUOVROB', this.offcppModel, 50).subscribe(result => {
                if (result) {

                }
            });
        }
    }
}
