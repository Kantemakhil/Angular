import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@common/translate/translate.service";
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OffenderSentConditions } from "@inst/legal/beans/OffenderSentConditions";
import { OcimyoffService } from "../service/ocimyoff.service";

@Component({
    selector: 'app-ocuallco',
    templateUrl: './ocuallco.component.html',
    styleUrls: []
})
export class OcuallcoComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    conditionColDef: any[] = [];
    conditionData: OffenderSentConditions[] = [];
    msgs: { message: any; type: any; }[];
    constructor(public translateService: TranslateService, private ocimyoffFactory: OcimyoffService) {
    }
    ngOnInit() {
        this.conditionColDef = [
            { fieldName: this.translateService.translate('ocuallco.orderno'), field: 'orderNo', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocuallco.conditioncategory'), field: 'categoryType', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocuallco.description'), field: 'description', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocuallco.length'), field: 'lengthUnit', editable: false, width: 150, datatype: 'number' },
            { fieldName: this.translateService.translate('ocuallco.startdate'), field: 'startDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocuallco.enddate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocuallco.referral'), field: 'programReferral', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocuallco.conditionstatus'), field: 'conditionStatus', editable: false, width: 150, datatype: 'text' },
        ];
        this.allocatedConditionExeQuery(this.dialog.data);
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    allocatedConditionExeQuery(event) {
        if (event) {
            this.ocimyoffFactory.offenderConditionExecuteQuery(event).subscribe(data => {
                if (data.length === 0) {
                    this.show(this.translateService.translate('common.querycausednorecords'), 'warn');
                    this.conditionData = [];
                    return;
                } else {
                    data.forEach(ele => {
                        if (ele.length && ele.lengthUnit) {
                            ele.lengthUnit = ele.length + ' ' + ele.lengthUnit;
                        }
                    });
                    this.conditionData = data;
                }
            });

        }
    }
    closeDialog() {
        this.dialog.close(null);
    }
}