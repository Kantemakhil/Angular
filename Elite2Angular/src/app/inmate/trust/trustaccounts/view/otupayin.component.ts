import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtupayinService } from '../service/otupayin.service';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { OffenderTransactions } from '../beans/OffenderTransactions';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
@Component({
    selector: 'app-otupayin',
    templateUrl: './otupayin.component.html'
})

export class OtupayinComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    offdedData: OffenderDeductions[] = [];
    offdedDataTemp: OffenderDeductions[] = [];
    offdedModel: OffenderDeductions = new OffenderDeductions();
    offdedModelTemp: OffenderDeductions = new OffenderDeductions();
    offdedIndex: number;
    offtxnData: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnIndex = -1;
    offTxnColumnDef: any[];
    constructor(private otupayinFactory: OtupayinService, public translateService: TranslateService,
        public dialogService: DialogService) {
        this.offTxnColumnDef = [];

    }
    ngOnInit() {
        this.offTxnColumnDef = [
            { fieldName: this.translateService.translate('otupayin.txnid'), field: 'txnId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otupayin.seq'), field: 'txnEntrySeq', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('otupayin.txndate'), field: 'txnEntryDate',
                editable: false, datatype: 'date', width: 150
            },
            { fieldName: this.translateService.translate('otupayin.txnamount'), field: 'txnEntryAmount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.totalpaid'), field: 'totalPaid', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otupayin.totalowed'), field: 'totalOwed', editable: false, width: 150 },
        ];
        this.offdedModelTemp = new OffenderDeductions();
        this.offdedModelTemp.offenderDeductionId = this.dialog.data.offenderDeductionId;
        this.offdedModelTemp.caseloadId = this.dialog.data.caseloadId;
        this.offdedModelTemp.offenderId = this.dialog.data.offenderId;
        this.offdedModelTemp.deductionType = this.dialog.data.deductionType;
        this.offdedModelTemp.totPaid = this.dialog.data.deductionAmount;
        if (this.dialog.data.maxMonthlyAmount === 'UNLIMITED') {
            this.offdedModelTemp.totOwing = 786;

        } else {
        this.offdedModelTemp.totOwing = isNaN(Number(this.dialog.data.maxMonthlyAmount)) ? 0 : this.dialog.data.maxMonthlyAmount;
        }
        this.offdedExecuteQuery();
    }
    /**
     * Method is called at the time of screen loading.
     * Used to get the data from Db and displays the data in Grid and text fields.
     */
    offdedExecuteQuery() {
        const offdedResult = this.otupayinFactory.
            offDedExecuteQuery(this.offdedModelTemp);
        offdedResult.subscribe(offdedResultList => {
            if (offdedResultList.length === 0) {
                this.offdedData = [];
            } else {
                this.offdedData = offdedResultList;
                this.offdedModel = offdedResultList;
                for (let i = 0; i < offdedResultList.offTransList.length; i++) {
                    offdedResultList.offTransList[i].txnEntryAmount = offdedResultList.offTransList[i].txnEntryAmount.toFixed(2);
                    offdedResultList.offTransList[i].totalPaid = offdedResultList.offTransList[i].totalPaid.toFixed(2);
                    if (offdedResultList.offTransList[i].totalOwed === 786.0) {
                        offdedResultList.offTransList[i].totalOwed = 'UNLIMITED';
                    } else {
                    offdedResultList.offTransList[i].totalOwed = offdedResultList.offTransList[i].totalOwed.toFixed(2);
                    }
                    if (offdedResultList.offTransList[i].totalOwed < 0) {
                        offdedResultList.offTransList[i].totalOwed =  '<' +
                         Math.abs(Number(offdedResultList.offTransList[i].totalOwed)).toFixed(2)  + '>';
                    }
                    if (offdedResultList.offTransList[i].txnEntryAmount) {
                        if (offdedResultList.offTransList[i].txnPostingType === 'DR') {
                            // offdedResultList.offTransList[i].txnEntryAmount =  offdedResultList.offTransList[i].txnEntryAmount * -1;
                            offdedResultList.offTransList[i].txnEntryAmount = '<' + offdedResultList.offTransList[i].txnEntryAmount + '>';
                        }
                    }
                }
                this.offtxnData = offdedResultList.offTransList;
                this.offtxnIndex = 0;
            }
        });
    }

    /**
     * event is fired when click on the exit button.
     */
    exit() {
        this.dialog.close(0);
    }

}
