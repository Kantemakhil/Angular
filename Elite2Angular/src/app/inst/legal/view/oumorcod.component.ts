import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { Offenses } from '@inst/legal/beans/offenses';
import { OcdccaseService } from '@inst/legal/service/ocdccase.service';

@Component({
    selector: 'app-oumorcod',
    templateUrl: './oumorcod.component.html',
})

export class OumorcodComponent implements OnInit {
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    offensesResultCodeData: Offenses[] = [];
    offensesDataModel: Offenses = new Offenses();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offencesResultCodeColumndef: any[];
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    constructor(private OcdccaseFactory: OcdccaseService,
        public translateService: TranslateService) {
        this.offencesResultCodeColumndef = [];
    }

    ngOnInit() {
        this.offensesResultCodeGridData();
        if (this.dialog.data) { }
        this.offencesResultCodeColumndef = [
            {
                fieldName: this.translateService.translate('oumorcod.resultcode'),
                field: 'code', editable: true, width: 180
            },
            {
                fieldName: this.translateService.translate('oumorcod.description'),
                field: 'description', editable: false, width: 180
            },
            {
                fieldName: this.translateService.translate('oumorcod.disposition'),
                field: 'disposition', editable: true, width: 150, datatype: 'lov', domain: 'OFF_RESULT'

            },
            /*{
                fieldName: this.translateService.translate('oumorcod.code'),
                field: 'dispositionDescription', editable: true, width: 150

            },*/
            {
                fieldName: this.translateService.translate('oumorcod.offensestatus'),
                field: 'offenseStatus', editable: true, width: 150

            },
            {
                fieldName: this.translateService.translate('oumorcod.conviction'),
                field: 'offenseCode', editable: true, width: 150
            }
        ];
    }
    offensesResultCodeGridData() {
        const offensesResultCodeData = this.OcdccaseFactory.offencesResultsCodes();
        offensesResultCodeData.subscribe(list => {
            this.offensesResultCodeData = list;
        });
    }
    onDialogRowClickEvent(event) {
        this.offensesDataModel.description = event.description;
        this.offensesDataModel.code = event.code;
        this.offensesDataModel.offenseStatus = event.offenseStatus;
        this.offensesDataModel.disposition = event.disposition;
        this.offensesDataModel.disposition = event.disposition;
    }
    processSelectedData() {
        if (this.dialog.data.resultButton == null || this.dialog.data.resultButton === undefined
            || this.dialog.data.resultButton == null || this.dialog.data.resultButton === '') {
            this.dialog.close({
                resultcode1: this.offensesDataModel.code,
                disposition: this.offensesDataModel.disposition,
                chargeStatus: this.offensesDataModel.offenseStatus,
                outcomeReasonCode: this.offensesDataModel.code
            });
        } else {
            this.dialog.close(null);
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    exit(): void {
        this.dialog.close(null);
    }
}
