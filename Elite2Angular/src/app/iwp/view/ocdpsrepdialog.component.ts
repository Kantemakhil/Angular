import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@common/translate/translate.service";
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OrdersHty } from "@cm/courtcasesandorders/maintenance/beans/OrdersHty";
import { OcdpsrepService } from "../service/ocdpsrep.service";

@Component({
    selector: 'app-ocdpsrepdialog',
    templateUrl: './ocdpsrepdialog.component.html',
})
export class OcdpsrepdialogComponent implements OnInit {

    @ViewChild('dialog', { static: true }) dialog: DialogComponent;


    msgs: { message: any; type: any; }[];

    reportsHistoryColDef: any[] = [];
    reportsHistory: OrdersHty[] = [];

    constructor(public translateService: TranslateService, private ocdpsrepFactory: OcdpsrepService) {

    }
    ngOnInit() {

        this.reportsHistoryColDef = [
            { fieldName: this.translateService.translate('ocdpsrep.reportType'), field: 'orderType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdpsrep.court'), field: 'issuingAgyLocId', editable: false },
            { fieldName: this.translateService.translate('ocdpsrep.dateRequested'), field: 'requestDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocdpsrep.dateDue'), field: 'dueDate', editable: true, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocdpsrep.teamresponsible'), field: 'teamId', editable: true, width: 150 },
            { fieldName: this.translateService.translate('ocdpsrep.reportauthor'), field: 'staffMemberId', editable: true, width: 150 },
            { fieldName: this.translateService.translate('ocdpsrep.status'), field: 'orderStatus', editable: true, width: 150 },
            { fieldName: this.translateService.translate('ocdpsrep.updatedate'), field: 'createDatetime', width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocdpsrep.updateby'), field: 'createUserId', editable: true, width: 150 }
        ];
        this.reportsHistory = [];
        this.reportOrdersExecutequery(this.dialog.data.orderId);
    }


    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    closeDialog() {
        this.dialog.close(null);
    }

    reportOrdersExecutequery(orderId: number) {
        this.ocdpsrepFactory.ordHistoryExecuteQuery(orderId).subscribe(data => {
            if (data.length === 0) {
                this.show(this.translateService.translate('common.querycausednorecords'), 'warn');
                this.reportsHistory = [];
                return;
            } else {
                this.reportsHistory = data;
            }
        });
    }
}