import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtiopinqService } from '../service/otiopinq.service';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderTransactions } from '@inmate/trust/trustaccounts/beans/OffenderTransactions';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
    selector: 'app-otiopinq',
    templateUrl: './otiopinq.component.html',
    styleUrls: []
})

export class OtiopinqComponent implements OnInit {
    msgs: any[] = [];
    caseloadId: string;
    offDedSelected = -1;
    offTxnSelected = -1;
    offdedData: OffenderDeductions[] = [];
    offdedModel: OffenderDeductions = new OffenderDeductions();
    offtxnData: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offTxnColumnDef: any[];
    offDedColumnDef: any[];
    vTrustHeader: VTrustHeader = new VTrustHeader();
    constructor(private otiopinqFactory: OtiopinqService,
        private translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService) {
        this.offTxnColumnDef = [];
        this.offDedColumnDef = [];
    }
    ngOnInit() {
        this.vTrustHeader = this.offenderSearchService.selectedOffender;
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.offTxnColumnDef = [
            { fieldName: this.trMsg('common.date'), field: 'txnEntryDate', editable: false, width: 150,
                datatype: 'date' },
            { fieldName: this.trMsg('common.type'), field: 'txnType', editable: false, width: 150 },
            { fieldName: this.trMsg('common.description'), field: 'txnEntryDesc', editable: false, width: 150 },
            { fieldName: this.trMsg('otiopinq.trnsamt'), field: 'nbtTxnEntryAmount2', editable: false, width: 150 },
        ];
        this.offDedColumnDef = [
            { fieldName: '', field: 'nbtAdjustmentReasonCode', editable: false, width: 150 },
            { fieldName: this.trMsg('common.code'), field: 'deductionType', editable: false, width: 150 },
            {
                fieldName: this.trMsg('common.description'), field: 'dspDeductionDesc', datatype: 'lov',
                link: 'otiopinq/cgfkchkOffDedOffDedDed', editable: false, width: 150
            },
            { fieldName: this.trMsg('otiopinq.create'), field: 'caseloadId', editable: false, width: 150 },
            { fieldName: this.trMsg('otiopinq.infonum'), field: 'informationNumber', editable: false, width: 150 },
            { fieldName: this.trMsg('otiopinq.totown'), field: 'nbtDeductionAmount', editable: false, width: 150 },
        ];
        if (!this.vTrustHeader) {
            this.show('common.pleasesearchforvalidoffender');
        }
    }
    onRowClickoffded(event) {
        this.offtxnData = [];
        if (event) {
            this.offtxnModel.caseloadId = this.caseloadId;
            this.offtxnModel.offenderId = event.offenderId;
            this.offtxnModel.deductionType = event.deductionType;
            this.offtxnModel.infoNumber = event.informationNumber;
            this.offtxnExecuteQuery();
        }

    }
    onRowClickofftxn(event) {
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
        if (offender && offender.rootOffenderId) {
            this.offdedModel.caseloadId = this.caseloadId;
            this.offdedModel.offenderId = offender.rootOffenderId;
            this.offdedExecuteQuery();
        } else {
            this.offdedData = [];
            this.offtxnData = [];
        }
    }
    offdedExecuteQuery() {
        this.offDedSelected = -1;
        const offdedResult = this.otiopinqFactory.
            offDedExecuteQuery(this.offdedModel);
        offdedResult.subscribe(offdedResultList => {
            if (offdedResultList.length === 0) {
                this.offdedData = [];
            } else {
                offdedResultList.forEach(ele => {
                    ele.dspDeductionDesc = ele.deductionType;
                    if (ele.nbtDeductionAmount < 0) {
                        ele.nbtDeductionAmount = `<${Math.abs(ele.nbtDeductionAmount).toFixed(2)}>`;
                    }
                });
                this.offdedData = offdedResultList;
                this.offDedSelected = 0;
            }
        });
    }
    offtxnExecuteQuery() {
        this.offTxnSelected = -1;
        const offtxnResult = this.otiopinqFactory.
            offTxnExecuteQuery(this.offtxnModel);
        offtxnResult.subscribe(offtxnResultList => {
            if (offtxnResultList.length === 0) {
                this.offtxnData = [];
            } else {
                offtxnResultList.forEach(ele => {
                    if (ele.nbtTxnEntryAmount2 < 0) {
                        ele.nbtTxnEntryAmount2 = `<${Math.abs(ele.nbtTxnEntryAmount2).toFixed(2)}>`;
                    } else {
                        ele.nbtTxnEntryAmount2 = `${Math.abs(ele.nbtTxnEntryAmount2).toFixed(2)}`;
                    }
                });
                this.offtxnData = offtxnResultList;
                this.offTxnSelected = 0;
            }
        });
    }
    syspflExecuteQuery() { }

    birthDateKeyListvalTrigger() { }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }


}
