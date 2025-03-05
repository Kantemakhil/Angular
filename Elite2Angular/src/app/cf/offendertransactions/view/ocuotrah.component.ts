import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuotrahService } from '../service/ocuotrah.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';

@Component({
    selector: 'app-ocuotrah',
    templateUrl: './ocuotrah.component.html'
})

export class OcuotrahComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnIndex: Number = 0;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdatetList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: Number = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    display: Boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: Boolean;
    editable: Boolean = true;
    offTxnColumnDef: any[];
    offTxnReadOnly: Boolean = false;
    sysPflReadOnly: Boolean = false;
    buttonDisabled: boolean;
    disableSearchFields: boolean;
    clearDisabled: boolean;
    txnType: any;
    txnEntryDate: any;
    retrivedisabled: boolean;
    tableIndex: number;
    constructor(private ocuotrahFactory: OcuotrahService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.offTxnColumnDef = [];
    }
    ngOnInit() {
        this.buttonDisabled = true;
        this.disableSearchFields = true;
        this.clearDisabled = false;
        this.retrivedisabled = true;
        this.offTxnColumnDef = [
            {
                fieldName: this.translateService.translate('common.date'), field: 'txnEntryDate', editable: false,
                width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.time'), field: 'createDatetime', editable: false, width: 150,
                datatype: 'time',
            },
            { fieldName: this.translateService.translate('common.type'), field: 'txnType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.description'), field: 'txnEntryDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuotrah.modifyuserid'), field: 'modifyUserId', editable: false, width: 150 },
        ];
        this.offtxnExecuteQuery();
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
    offtxnExecuteQuery(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.clearDisabled = false;
                return;
            }
        }
        this.offtxnModel = new OffenderTransactions();
        if (this.txnType) {
              this.offtxnModel.txnType = this.txnType;
        }
        if (this.txnEntryDate) {
            this.offtxnModel.txnEntryDate = this.txnEntryDate;
        }
        this.offtxnModel.caseloadId = this.dialog.data.caseLoadId;
        this.offtxnModel.offenderId = this.dialog.data.rootOffenderId;
        this.offtxnModel.txnId = this.dialog.data.lastTxnId;
        const offtxnResult = this.ocuotrahFactory.offTxnExecuteQuery(this.offtxnModel);
        offtxnResult.subscribe(offtxnResultList => {
            if (offtxnResultList.length === 0) {
                this.offtxnData = [];
                this.buttonDisabled = true;
                this.retrivedisabled = true;
                this.show('common.querycaused');
                return;
            } else {
                offtxnResultList.forEach(obj => {
                    obj.txnEntryAmount = obj.txnEntryAmount.toFixed(2);
                });
                this.offtxnData = offtxnResultList;
                this.offtxnModel = offtxnResultList[0];
               this.tableIndex = 0;
                this.buttonDisabled = false;
                this.disableSearchFields = true;
                this.retrivedisabled = true;
                this.clearDisabled = false;
            }
        });
    }
    cancel() {
        this.offtxnData = [];
        this.offtxnModel = new OffenderTransactions();
        this.txnEntryDate = undefined;
        this.txnType = undefined;
        this.clearDisabled = true;
        this.disableSearchFields = false;
        this.buttonDisabled = true;
        this.retrivedisabled = false;

    }
    isInsertable(date?) {
		if (this.txnEntryDate || this.txnType) {
			this.clearDisabled = false;
		} else {
			this.clearDisabled = true;
		}
		if (date) {
			this.clearDisabled = false;
		}
	}
    syspflExecuteQuery() {
        const syspflResult = this.ocuotrahFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }
    onRowClickoffbkgs(event) {
        if (event) {
            this.offtxnModel = event;
        }
    }

}
