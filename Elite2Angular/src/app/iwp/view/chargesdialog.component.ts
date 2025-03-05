import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CourtReportCharges } from '../beans/CourtReportCharges';

@Component({
  selector: 'app-chargesdialog',
  templateUrl: './chargesdialog.component.html',
})
export class ChargesdialogComponent implements OnInit {
    @ViewChild('chargesDlgGrid', {static: true}) chargesDlgGrid: any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    message = ' Invalid.';
    msglist = [];
    type = 'error';
     myJsonRowData: any = [];
    inActiveCharges: any = [];
    msgs: any[];
    tableIndex: number;
    chargesDlgColumnDef: any[];
    chargesDlgData: CourtReportCharges[] = [];

    constructor(public translateService:TranslateService, public dialogService: DialogService,public dialogMat: MatDialog) { 
        this.chargesDlgColumnDef = [];
    }
    
    ngOnInit(): void { 
        this.chargesDlgData = this.dialog.data;

        this.chargesDlgColumnDef = [
            {
                fieldName: this.translateService.translate('ocdpsrep.select'), field: 'select',
                datatype: 'checkbox', width: 200, cellEditable: this.selectEditable
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.matter'), field: 'matter', editable: false, width: 150,
                datatype: 'text', maxlength: 100
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.description'), field: 'description', editable: false, width: 150,
                datatype: 'text', maxlength: 100
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.code'), field: 'code', editable: false, width: 150,
                datatype: 'text', maxlength: 100
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.act'), field: 'act', editable: false, width: 150,
                datatype: 'lov', link: 'ocmpconf/populateStatutes', source: 'OIMSTATU'
            },

            {
                fieldName: this.translateService.translate('ocdpsrep.outcome'), field: 'outcome', editable: false, width: 150,
                datatype: 'lov', link: 'ocmpconf/populateOutcome', source: 'OCMORCOD'
            },
        ]
    }

    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }

    onRowClickchargesDlg = (event) => {
    }

    selectEditable = (data: any, index: number, field: string) => {
        if (data.createDatetime != '' && data.createDatetime != undefined) {
            return false;
        } else {
            return true;
        }
    }

    onButExitClick() {
        var courtReportCharges : CourtReportCharges [] = [];
        const updated = [];
        this.chargesDlgGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
        updated.forEach(element => {
            if(element.select) {
                courtReportCharges.push(element);
            }
        });
        this.dialog.close(courtReportCharges);
    }

}
