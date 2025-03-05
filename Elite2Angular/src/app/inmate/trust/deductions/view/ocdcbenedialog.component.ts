import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OcdcbeneService } from '@inmate/trust/deductions/service/ocdcbene.service';
import { BeneficiaryTransactions } from '@inmate/beans/BeneficiaryTransactions';

@Component({
    selector: 'app-ocdcbenedialog',
    templateUrl: './ocdcbenedialog.component.html'
})

export class OcdcbenedialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    benTxnColumnDef: any[];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    offenderIdDisplay: any;
    bookingNo: any;
    lastFirstName: any;
    bentxnData: BeneficiaryTransactions[] = [];
    bentxnModel: BeneficiaryTransactions = new BeneficiaryTransactions();
    bentxnIndex = -1;
    constructor(public translateService: TranslateService,
        public dialogService: DialogService,
        private ocdcbeneFactory: OcdcbeneService) {
        this.benTxnColumnDef = [];
    }
    ngOnInit() {
        this.bentxnModel = new BeneficiaryTransactions();
        this.bentxnModel.caseloadId = this.dialog.data.caseloadId;
        this.bentxnModel.accountCode = this.dialog.data.accountCode;
        if (this.dialog.data.corporateId) {
            this.bentxnModel.corporateId = this.dialog.data.corporateId;
        }
        if (this.dialog.data.personId) {
            this.bentxnModel.personId = this.dialog.data.personId;
        }
        this.benTxnColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.name'), field: 'lastFirstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.date'), field: 'txnEntryDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.obligationid'), field: 'offenderDeductionId',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150 },
        ];
        this.bentxnExecuteQuery();
    }
    bentxnExecuteQuery() {
        const bentxnResult = this.ocdcbeneFactory.benTxnExecuteQuery(this.bentxnModel);
        bentxnResult.subscribe(bentxnResultList => {
            if (bentxnResultList.length === 0) {
                this.bentxnData = [];
            } else {
                this.bentxnData = [];
                for (let i = 0; i < bentxnResultList.length; i++) {
                    bentxnResultList[i].txnEntryAmount = Number(bentxnResultList[i].txnEntryAmount).toFixed(2);
                    if (bentxnResultList[i].sealFlag !== bentxnResultList[i].txnPostUsage) {
                        bentxnResultList[i].txnEntryAmount = bentxnResultList[i].txnEntryAmount * -1;
                        bentxnResultList[i].txnEntryAmount = Number(bentxnResultList[i].txnEntryAmount).toFixed(2);

                    }
                }
                this.bentxnData = bentxnResultList;
                this.bentxnModel = this.bentxnData[0];
                this.bentxnIndex = 0;
            }
        });
    }
    /**
     * event is fired when click on the row in Grid.
     * @param event
     */
    onRowClickbentxn(event) {
        if (event) {

        }

    }
    /**
     * event is fired when click on Exit Button.
     */
    ocdcbeneDialogClose() {
        this.dialog.close(null);
    }
}


