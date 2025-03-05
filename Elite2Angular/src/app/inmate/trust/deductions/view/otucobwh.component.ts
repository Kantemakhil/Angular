import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtucobwhService } from '../service/otucobwh.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OffenderAdjustmentTxns } from '@inmate/trust/deductions/beans/OffenderAdjustmentTxns';

@Component({
    selector: 'app-otucobwh',
    templateUrl: './otucobwh.component.html'
})

export class OtucobwhComponent implements OnInit {
	@ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    cowohData: OffenderAdjustmentTxns [] = [];
    cowohModel: OffenderAdjustmentTxns = new OffenderAdjustmentTxns();
    cowohIndex = -1;
    cowohColumnDef: any[];
    constructor(private otucobwhFactory: OtucobwhService,
                public translateService: TranslateService) {
        this.cowohColumnDef = [];
    }
    ngOnInit() {
        this.cowohColumnDef = [
            { fieldName: this.translateService.translate('common.date'), field: 'adjustmentDate', datatype: 'date',
            editable: false, width: 150 },
            { fieldName: this.translateService.translate('otucobwh.txnid'), field: 'txnId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('otidtacc.writeoffamt'), field: 'adjustmentAmount',
              editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.useridsmall'), field: 'adjustmentUserId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.comments'), field: 'adjustmentText', editable: false, width: 150 },
        ];
        this.cowohExecuteQuery();
    }
    /**
     * event is fired when click on Exit button.
     */
    onButExitclick() {
       this.dialog.close(null);
    }
    /**
     * event is fired when click on row in the grid.
     * @param event
     */
    onRowClickcowoh(event) {
        if (event) {
            this.cowohModel = new OffenderAdjustmentTxns();
            this.cowohModel = event;
        }
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
     }
    /**
     * Method used to get the data from OFFENDER_ADJUSTMENT_TXNS table.
     * param is offenderDeductionId.
     * getting offenderDeductionId from parent screen.
     */
    cowohExecuteQuery() {
        this.cowohModel = new OffenderAdjustmentTxns();
        this.cowohModel.offenderDeductionId = this.dialog.data.offenderDeductionId;
        const cowohResult = this.otucobwhFactory.cowohExecuteQuery(this.cowohModel);
        cowohResult.subscribe(data => {
            if (data.length === 0) {
                this.cowohData = [];
                this.show(this.translateService.translate('common.querycaused'));
            } else {
                this.cowohData = [];
                data.forEach(element => {
                    if (element.adjustmentAmount === 0) {
                        element.adjustmentAmount = null;
                    }
                    if (element.adjustmentAmount > 0) {
                        element.adjustmentAmount = Number(element.adjustmentAmount).toFixed(2);
                    }
                });

                this.cowohData = data;
                this.cowohModel = this.cowohData[0];
                this.cowohIndex = 0;
            }
        });
    }
}
