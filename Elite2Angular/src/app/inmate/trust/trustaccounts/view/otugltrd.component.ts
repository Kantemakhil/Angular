import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtugltrdService } from '../service/otugltrd.service';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-otugltrd',
    templateUrl: './otugltrd.component.html'
})

export class OtugltrdComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    gltxnData: GlTransactions[] = [];
    gltxnDataTemp: GlTransactions[] = [];
    gltxnModel: GlTransactions = new GlTransactions();
    gltxnIndex = -1;
    glTxnColumnDef: any[];
    transactionType: string;
    transactionDescription: string;
    postingDate: Date;
    reference: any;
    currentModel: string;
    constructor(private otugltrdFactory: OtugltrdService,
        public translateService: TranslateService,
        private router: Router) {
        this.glTxnColumnDef = [];
    }
    ngOnInit() {
        this.currentModel = this.router.url;
        this.glTxnColumnDef = [
            { fieldName: this.translateService.translate('common.glno'), field: 'txnId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.seq'), field: 'txnEntrySeq', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otugltrd.post'), field: 'txnPostUsage', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otugltrd.glacnt'), field: 'accountCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 150 },
        ];
        this.transactionDescription = this.dialog.data.txnEntryDesc;
        this.transactionType = this.dialog.data.txnType;
        this.postingDate = this.dialog.data.txnEntryDate;
        this.reference = this.dialog.data.txnReferenceNumber;
        this.gltxnModel = new GlTransactions();
        this.gltxnModel.txnId = this.dialog.data.txnId;
        this.gltxnModel.caseloadId = this.dialog.data.caseloadId;
        this.gltxnModel.txnType = this.dialog.data.txnType;
        this.gltxnModel.txnEntrySeq = this.dialog.data.txnEntrySeq;
        this.gltxnExecuteQuery();
    }
    /**
		 * Method is used to get the data from DB and displays the data in Grid.
		 */
    gltxnExecuteQuery() {
        const gltxnResult = this.otugltrdFactory.
            glTxnExecuteQuery(this.gltxnModel);
        gltxnResult.subscribe(gltxnResultList => {
            if (gltxnResultList.length === 0) {
                this.gltxnData = [];
            } else {
                for (let i = 0; i < gltxnResultList.length; i++) {
                    gltxnResultList[i].txnEntryAmount = Number(gltxnResultList[i].txnEntryAmount).toFixed(2);
                }
                this.gltxnData = gltxnResultList;
                this.gltxnModel = gltxnResultList[0];
                this.gltxnIndex = 0;
            }
        });
    }
    /**
     * event is fired when click on exit button.
     */
    exit() {
        this.dialog.close(0);
    }

}
