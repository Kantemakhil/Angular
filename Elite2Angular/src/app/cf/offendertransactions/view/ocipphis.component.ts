import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcipphisService } from '../service/ocipphis.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VPaymentPlanHistories } from '../beans/VPaymentPlanHistories';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
// import required bean declarations

@Component({
    selector: 'app-ocipphis',
    templateUrl: './ocipphis.component.html'
})

export class OcipphisComponent implements OnInit {
    @ViewChild('dialog', {static:true}) dialog: DialogComponent;
    msgs: any[] = [];
    vpaymentplanhistoriesData: VPaymentPlanHistories[] = [];
    vpaymentplanhistoriesModel: VPaymentPlanHistories = new VPaymentPlanHistories();
    disabled: boolean;
    editable: Boolean = true;
    vPaymentPlanHistoriesColumnDef: any[];
    vPaymentPlanHistoriesReadOnly: Boolean = false;
    tableIndex: number;
    vpaymentplanhistoriesSearchModel: VPaymentPlanHistories;
    namesReadOnly: boolean;
    retriveDisabled: boolean;
    clearDisabled: boolean;
    infoNumber: any;
    constructor(private ocipphisFactory: OcipphisService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.vPaymentPlanHistoriesColumnDef = [];
    }
    ngOnInit() {
        this.vpaymentplanhistoriesSearchModel = new VPaymentPlanHistories();
     //   this.vpaymentplanhistoriesSearchModel.informationNumber = this.dialog.data.informationNumber;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.vPaymentPlanHistoriesColumnDef = [
            { fieldName: this.translateService.translate('ocipphis.caseinfo'), field: 'informationNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocipphis.groupid'), field: 'groupId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocipphis.type'), field: 'groupCode', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocipphis.startdate'), field: 'startDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocipphis.enddate'), field: 'endDate',
                editable: false, width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('ocipphis.frequency'), field: 'frequency', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocipphis.closedate'), field: 'paymentClosedDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocipphis.scheduleddate'), field: 'paymentDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocipphis.transactiondate'), field: 'transactionDate', editable: false,
                width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('ocipphis.scheduledamount'), field: 'paymentAmount', editable: false, width: 150,
            },
            { fieldName: this.translateService.translate('ocipphis.paidamount'), field: 'paidAmount',
             editable: false, width: 150},
        ];
        // TODO all initializations heres
       // this.vpaymentplanhistoriesExecuteQuery(null);
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
    }  /** 
  * This function displays the messages
  */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickvpaymentplanhistories(event) {
    }
    /**
    * event is fired when click on Exit button.
    */
    onButExitclick() {
        this.dialog.close(null);
    }
    vpaymentplanhistoriesExecuteQuery(date?, dateOne?, dateTwo?, dateThree?, dateFour?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (dateOne) {
            if (dateOne.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(dateOne.lastValue).indexOf('_') >= 0 && dateOne.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (dateTwo) {
            if (dateTwo.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(dateTwo.lastValue).indexOf('_') >= 0 && dateTwo.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (dateThree) {
            if (dateThree.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(dateThree.lastValue).indexOf('_') >= 0 && dateThree.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (dateFour) {
            if (dateFour.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                return;
            }
            if (String(dateFour.lastValue).indexOf('_') >= 0 && dateFour.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                return;
            }
        }
        if (this.infoNumber) {
            this.vpaymentplanhistoriesSearchModel.informationNumber = this.infoNumber;
        }
        this.vpaymentplanhistoriesSearchModel.offenderId = this.dialog.data.offenderId;
        const vpaymentplanhistoriesResult = this.ocipphisFactory.vPaymentPlanHistoriesExecuteQuery(this.vpaymentplanhistoriesSearchModel);
        vpaymentplanhistoriesResult.subscribe(vpaymentplanhistoriesResultList => {
            if (vpaymentplanhistoriesResultList.length === 0) {
                this.vpaymentplanhistoriesData = [];
                this.retriveDisabled = false;
                this.clearDisabled = true;
                this.namesReadOnly = false;
                this.show('common.querycaused');
                this.clear();
            } else {
                vpaymentplanhistoriesResultList.forEach(element => {
                    element.paymentAmount = '$' + parseFloat(element.paymentAmount).toFixed(2);
                    element.paidAmount = '$' + parseFloat(element.paidAmount).toFixed(2);
                });
                this.vpaymentplanhistoriesData = vpaymentplanhistoriesResultList;
                this.vpaymentplanhistoriesModel = vpaymentplanhistoriesResultList[0];
                this.tableIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
            }
        });
    }
    isInsertable(date?, dateOne?, dateTwo?, dateThree?, dateFour?) {
        if (this.vpaymentplanhistoriesSearchModel.informationNumber || this.vpaymentplanhistoriesSearchModel.groupId ||
            this.vpaymentplanhistoriesSearchModel.groupCode || this.vpaymentplanhistoriesSearchModel.startDate ||
            this.vpaymentplanhistoriesSearchModel.endDate || this.vpaymentplanhistoriesSearchModel.frequency
            || this.vpaymentplanhistoriesSearchModel.paymentClosedDate || this.vpaymentplanhistoriesSearchModel.paymentDate
            || this.vpaymentplanhistoriesSearchModel.transactionDate || this.vpaymentplanhistoriesSearchModel.paymentAmount
            || this.vpaymentplanhistoriesSearchModel.paidAmount || this.namesReadOnly 
             || this.infoNumber
            ) {
           // this.clearDisabled = false;
        } else {
          this.clearDisabled = true;
        }
        if (date || dateOne) {
          //  this.clearDisabled = false;
        }
    }
    clear() {
        this.vpaymentplanhistoriesData = [];
        this.vpaymentplanhistoriesSearchModel = new VPaymentPlanHistories();
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.infoNumber = undefined;

    }
}
