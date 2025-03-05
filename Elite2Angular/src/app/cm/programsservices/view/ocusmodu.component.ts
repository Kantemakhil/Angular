import {
    Component, OnInit, ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcusmoduService } from '../service/ocusmodu.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VAcpSchedules } from '../beans/VAcpSchedules';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcdprogrService } from '../service/ocdprogr.service';

@Component({
    selector: 'app-ocusmodu',
    templateUrl: './ocusmodu.component.html'
})

export class OcusmoduComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid', { static: true }) grid: any;
    lovModel: any[];
    msgs: any[] = [];
    vacpschData: VAcpSchedules[] = [];
    vacpschDataTemp: VAcpSchedules[] = [];
    vacpschModel: VAcpSchedules = new VAcpSchedules();
    vacpschIndex: number;
    vacpschInsertList: VAcpSchedules[] = [];
    vacpschUpdatetList: VAcpSchedules[] = [];
    vacpschDeleteList: VAcpSchedules[] = [];
    vAcpSchColumnDef: any[];
    nbtDescription: string;
    selectDis: boolean;
    checkDis: boolean;
    constructor(private ocdprogrFactory: OcdprogrService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService) {
        this.vAcpSchColumnDef = [];

    }
    ngOnInit() {

        this.nbtDescription = this.dialog.data.phaseDesc;
        if (this.dialog.data.queryOnly) {
            this.selectDis = true;
            this.checkDis = false;
        } else {
            this.selectDis = false;
            this.checkDis = true;
        }

        this.vAcpSchColumnDef = [
            {
                fieldName: this.translateService.translate('common.select'), datatype: 'checkbox', field: 'nbtSelect',
                editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.date'), datatype: 'date', field: 'scheduleDate',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocusmodu.weekday'), datatype: 'text', field: 'weekDay',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.startTime'), datatype: 'time', field: 'startTime',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.endTime'), datatype: 'time', field: 'endTime',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.module'), datatype: 'text', field: 'moduleInstanceDesc',
                editable: false, width: 150
            },
        ];

        this.vacpschExecuteQuery();
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    vacpschExecuteQuery() {
        this.vacpschModel.phaseInstanceId = this.dialog.data.crsActyId; // 7093
        this.vacpschModel.pModuleFrom = this.dialog.data.moduleFrom;
        this.vacpschModel.pModuleTo = this.dialog.data.moduleTo;
        this.vacpschModel.sessionNo = this.dialog.data.startSessionNo;
        const vacpschResult = this.ocdprogrFactory.vAcpSchExecuteQuery(this.vacpschModel);
        vacpschResult.subscribe(data => {
            if (data.length === 0) {
                this.vacpschData = [];
                this.selectDis = true;
            } else {
                data.forEach(element => {
                    element.nbtSelect = element.nbtSelect === 'Y' ? true : false;
                });
                this.vacpschData = data;
                this.vacpschDataTemp = JSON.parse(JSON.stringify(this.vacpschData));
                this.vacpschModel = data[0];
                this.vacpschIndex = 0;
            }
        });
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (this.vacpschDataTemp[rowIndex].nbtSelect && this.vacpschDataTemp[rowIndex].nbtSelect !== this.vacpschData[rowIndex].nbtSelect) {
            this.grid.setColumnData('nbtSelect', rowIndex, this.vacpschData[rowIndex].nbtSelect);
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    onButSelect() {

        if (!this.vacpschModel.nbtSelect) {
            this.show('ocusmodu.nomoduleshaveselected', 'warn');
            return;
        }

        if (DateFormat.compareDate(DateFormat.getDate(this.vacpschModel.scheduleDate), DateFormat.getDate()) === -1) {
            const data = {
                label: this.translateService.translate('ocusmodu.startdateyesnopopupmsg'),
                yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 60).subscribe(result => {
                if (result) {
                    this.dialog.close(this.vacpschModel);
                } else {
                }
            });
        }
        else {
            this.dialog.close(this.vacpschModel);
        }
    }

    onRowClick(event) {
        this.vacpschModel = event;
    }

    onButExitclick() {
        this.dialog.close(null);
    }

}
