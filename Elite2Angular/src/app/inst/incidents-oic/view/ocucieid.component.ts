import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups/src/dialog/dialog.component';
import { ExternalInvestigationOffenses } from '@instoicbeans/ExternalInvestigationOffenses';
import { AgencyIncidentCharges } from '../beans/AgencyIncidentCharges';
import { OcucieidService } from '../service/ocucieid.service';
import { ExternalInvestigationOffensesCommitBean } from '@instincidentsbeans/ExternalInvestigationOffensesCommitBean';
import { AppConstants } from '@core/classes/appConstants';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

@Component({
    selector: 'app-ocucieid',
    templateUrl: './ocucieid.component.html'

})

export class OcucieidComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid', { static: true }) grid: any;
    externalInvestigationOffenses: ExternalInvestigationOffenses = new ExternalInvestigationOffenses();
    extInvDetailsRowdata: ExternalInvestigationOffenses[] = [];
    extInvDetailsColDef: any[] = [];
    agyincichgDataTemp: AgencyIncidentCharges = new AgencyIncidentCharges();
    dialogCharge: string;
    dialogChargeDesc; string;
    chargesGridIndex: number = -1;
    extInvgInsertList: ExternalInvestigationOffenses[] = [];
    extInvUpdateList: ExternalInvestigationOffenses[] = [];
    extInvDeleteList: ExternalInvestigationOffenses[] = [];
    externalInvestigationOffensesCommitBean: ExternalInvestigationOffensesCommitBean = new ExternalInvestigationOffensesCommitBean();
    externalInvestigationOffensesTemp: ExternalInvestigationOffenses = new ExternalInvestigationOffenses();
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    checkInsertOrUpdate: boolean;
    checkDelete: boolean;

    constructor(public translateService: TranslateService, public dialogService: DialogService, public ocucieidService: OcucieidService)  {
    }

    ngOnInit(): void {
        this.agyincichgDataTemp = this.dialog['data'];
        this.externalInvestigationOffensesTemp.agencyIncidentId = this.agyincichgDataTemp.agencyIncidentId;
        this.externalInvestigationOffensesTemp.chargeSeq = this.agyincichgDataTemp.chargeSeq;
        this.extInvDetailsColDef = [
            {
                fieldName: this.translateService.translate('ocucieid.charge'), field: 'charge', editable: false, width: 150, datatype: 'text'
            },

            {
                fieldName: this.translateService.translate('ocucieid.chargeDescription'), field: 'chargeDescription', editable: false, width: 150, datatype: 'text'
            },

            {
                fieldName: this.translateService.translate('ocucieid.externalId'), field: 'externalId', editable: true, width: 150, datatype: 'text', uppercase: 'false',
            },

            {
                fieldName: this.translateService.translate('ocucieid.contactDate'), field: 'contactDate', editable: true, width: 150, datatype: 'date'
            },

            {
                fieldName: this.translateService.translate('ocucieid.contactTime'), field: 'contactTime', editable: true, width: 150, datatype: 'time',cellEditable:this.exteInvCellEdit,
            },

            {
                fieldName: this.translateService.translate('ocucieid.extInvStatus'), field: 'extInvStatus', editable: true, width: 150, datatype: 'lov', domain: 'EXT_INV_STAT'
            },

            {
                fieldName: this.translateService.translate('ocucieid.extInvComment'), field: 'extInvComment', editable: true, width: 150, datatype: 'text', uppercase: 'false'
            },
            { field: 'agencyIncidentId', hide: 'true', width: 150, datatype: 'number' },
            { field: 'chargeSeq', hide: 'true', width: 150, datatype: 'number' },
            { field: 'eidSeq', hide: 'true', width: 150, datatype: 'number' }


        ];

        this.getAllExternalInvstDetails();
        this.checkForInsertOrUpdateAndDeleteExternalInvst();

    }

    checkForInsertOrUpdateAndDeleteExternalInvst() {
        const obj = this.ocucieidService.checkForInsertOrUpdateAndDeleteExternalInvst();
        obj.subscribe(data => {
            if (data) {
                this.checkInsertOrUpdate = (data.chargeSeq === 0) ? false : true;
                this.checkDelete = (data.eidSeq === 0) ? false : true;
            }
        });
    }
    onGridInsert = () => {
        return {
            charge: this.agyincichgDataTemp.chargedOicOffenceCode,
            chargeDescription: this.agyincichgDataTemp.offenceDesc,
            agencyIncidentId: this.agyincichgDataTemp.agencyIncidentId,
            chargeSeq: this.agyincichgDataTemp.chargeSeq,
        };
    }
 
    extInvDetailsSave(event) {
        this.extInvgInsertList = [];
        this.extInvUpdateList = [];
        this.extInvDeleteList = [];
        this.extInvgInsertList = event.added;
        this.extInvUpdateList = event.updated;
        this.extInvDeleteList = event.removed;
        this.externalInvestigationOffensesCommitBean.insertList = [];
        this.externalInvestigationOffensesCommitBean.updateList = [];
        this.externalInvestigationOffensesCommitBean.deleteList = [];
        if (this.extInvgInsertList.length > 0 || this.extInvUpdateList.length > 0) {
            if (!this.checkInsertOrUpdate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucieid.checkInsertOrUpdate');
                this.show();
                return;
            }
            for (let i = 0; i < this.extInvgInsertList.length; i++) {
                if(this.extInvgInsertList[i].contactTime){
                    let startHours = DateFormat.getDate(this.extInvgInsertList[i].contactTime).getHours();
                    let startMinutes = DateFormat.getDate(this.extInvgInsertList[i].contactTime).getMinutes();
                    let startSeconds = DateFormat.getDate(this.extInvgInsertList[i].contactTime).getSeconds();
                    this.extInvgInsertList[i].contactDate = DateFormat.getDate(DateFormat.getDate(this.extInvgInsertList[i].contactDate).setHours(startHours, startMinutes, 0, 0));
                }
            }

            for (let i = 0; i < this.extInvUpdateList.length; i++) {
                if(this.extInvUpdateList[i].contactTime){
                    let startHours = DateFormat.getDate(this.extInvUpdateList[i].contactTime).getHours();
                    let startMinutes = DateFormat.getDate(this.extInvUpdateList[i].contactTime).getMinutes();
                    let startSeconds = DateFormat.getDate(this.extInvUpdateList[i].contactTime).getSeconds();
                    this.extInvUpdateList[i].contactDate = DateFormat.getDate(DateFormat.getDate(this.extInvUpdateList[i].contactDate).setHours(startHours, startMinutes, 0, 0));
                }
            }
            this.externalInvestigationOffensesCommitBean.insertList = this.extInvgInsertList;
            this.externalInvestigationOffensesCommitBean.updateList = this.extInvUpdateList;
        }
        if (this.extInvDeleteList.length > 0) {
            if (!this.checkDelete) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocucieid.checkDelete');
                this.show();
                return;
            }
            this.externalInvestigationOffensesCommitBean.deleteList = this.extInvDeleteList;

        }

        const obj = this.ocucieidService.inserUpdateDeleteExternalInvst(this.externalInvestigationOffensesCommitBean);
        obj.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.getAllExternalInvstDetails();
            }
            else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.getAllExternalInvstDetails();
            }
        });

    }

    getAllExternalInvstDetails() {
        const obj = this.ocucieidService.getAllExternalInvstDetails(this.externalInvestigationOffensesTemp);
        obj.subscribe(data => {
            if (data.length > 0) {
                this.extInvDetailsRowdata = data;
                this.extInvDetailsRowdata.forEach(e => {
                    e.charge = this.agyincichgDataTemp.chargedOicOffenceCode;
                    e.chargeDescription = this.agyincichgDataTemp.offenceDesc;
                    if(e.contactDate){
                        e.contactTime = e.contactDate;
                    }else{
                        e.contactTime = undefined;
                    }
                });
                this.chargesGridIndex = 0;
            } else {
                this.extInvDetailsRowdata = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            }
        })
    }

    extInvDetClose(event) {
        this.dialog.close(null);
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    exteInvCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.contactDate) {
            return true;
        } else {
            return false;
        }
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (!event.data.contactDate) {
            this.grid.setColumnData('contactTime', index, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }
}