import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmdspwdService } from '../service/ocmdspwd.service';
import { WlNonOffSpecificTasksCommitBean } from '@cm/communitysupervisiontiers/maintenance/beans/WlNonOffSpecificTasksCommitBean'
import { WlDefaultStaffUnits } from '../beans/WlDefaultStaffUnits';
import { WlNonOffSpecificTasks } from '../beans/WlNonOffSpecificTasks';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-ocmdspwd',
    templateUrl: './ocmdspwd.component.html',
})
export class OcmdspwdComponent implements OnInit {
    @ViewChild('assWorkloadUnits', { static: true }) assWorkloadUnits: any;
    @ViewChild('nonOffSpeTasks', { static: true }) nonOffSpeTasks: any;
    msgs: any[] = [];
    assStatingWLUnitsRowData: WlDefaultStaffUnits[] = [];
    assStatingWLUnitsInsertList: WlDefaultStaffUnits[] = [];
    assStatingWLUnitsUpdateList: WlDefaultStaffUnits[] = [];
    assStatingWLUnitsDeleteList: WlDefaultStaffUnits[] = [];
    assStartingWlUnitBean: WlNonOffSpecificTasks = new WlNonOffSpecificTasks();
    assStatingWLUnitsColumnDef: any[] = [];
    nonOffSpeTasksRowData: WlNonOffSpecificTasks[] = [];
    nonOffSpeTasksInsertList: WlNonOffSpecificTasks[] = [];
    nonOffSpeTasksUpdateList: WlNonOffSpecificTasks[] = [];
    nonOffSpeTasksDeleteList: WlNonOffSpecificTasks[] = [];
    nonOffSpeTasksColumnDef: any[] = [];
    nonOffSpeTasksCommitBean: WlNonOffSpecificTasksCommitBean = new WlNonOffSpecificTasksCommitBean();
    enableInsert: boolean;
    constructor(private ocmdspwdService: OcmdspwdService, public translateService: TranslateService, private sessionManager: UserSessionManager,) {
        this.assStatingWLUnitsColumnDef = [];
        this.nonOffSpeTasksColumnDef = [];
    }
    ngOnInit() {
        this.enableInsert = false;
        this.assStatingWLUnitsColumnDef = [
            {
                fieldName: this.translateService.translate('ocmdspwd.position'), field: 'staffPosition', editable: true, width: 150,
                datatype: 'lov', domain: 'STAFF_POS', required: true, cellEditable: this.positionCellEdit,
                titles: {
                    description: this.translateService.translate('common.description'),
                    code: this.translateService.translate('common.code')
                }
            },
            {
                fieldName: this.translateService.translate('ocmdspwd.defaultstartingunits'), field: 'defaultStartingUnits', editable: true, width: 150, required: true,
                datatype: 'number', whole: true, maxValue: '99999', strictFP: true,
            }
        ];

        this.nonOffSpeTasksColumnDef = [
            {
                fieldName: this.translateService.translate('ocmdspwd.agencylocation'), field: 'agyLocId', editable: true, width: 150,
                datatype: 'lov', link: 'ocmdspwd/getAgyLocRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad, required: true, cellEditable: this.positionCellEdit,
                titles: {
                    description: this.translateService.translate('common.description'),
                    code: this.translateService.translate('common.code')
                }
            },
            {
                fieldName: this.translateService.translate('ocmdspwd.workloadtasktype'), field: 'workloadTaskType', editable: true, width: 150,
                datatype: 'lov', domain: 'WRKLD_TASK', required: true, cellEditable: this.positionCellEdit,
                titles: {
                    description: this.translateService.translate('common.description'),
                    code: this.translateService.translate('common.code')
                }
            },
            {
                fieldName: this.translateService.translate('ocmdspwd.units'), field: 'units', editable: true, width: 150, required: true,
                datatype: 'number', whole: true, maxValue: '99999', strictFP: true,
            }
        ];

        this.assStartingDefWLUnitsExecuteQuery();
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    positionCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    assStartingDefWLUnitsExecuteQuery() {
        const serviceObj = this.ocmdspwdService.assStartingDefWLUnitsExecuteQuery();
        serviceObj.subscribe(data => {
            if (data.length == 0) {
                this.assStatingWLUnitsRowData = [];
                this.enableInsert = false;
            } else {
                this.assStatingWLUnitsRowData = data;
            }
        });
    }

    nonOffSpecTaskPosExecuteQuery() {
        const nonOffSpecData = this.ocmdspwdService.nonOffSpecTaskPosExecuteQuery(this.assStartingWlUnitBean);
        nonOffSpecData.subscribe(data => {
            if (data.length == 0) {
                this.nonOffSpeTasksRowData = [];
            } else {
                this.nonOffSpeTasksRowData = data;
            }
        });
    }

    assStartingWLUnitsData() {
        this.assStatingWLUnitsInsertList = [];
        this.assStatingWLUnitsUpdateList = [];
        this.assStatingWLUnitsDeleteList = [];
        this.assWorkloadUnits.updatedMap.forEach(
            (v: any, k: number) => {
                this.assStatingWLUnitsUpdateList.push(v);
            }
        );
        this.assWorkloadUnits.addedMap.forEach(
            (v: any, k: number) => {
                this.assStatingWLUnitsInsertList.push(v);
            }
        );
        this.assWorkloadUnits.removedMap.forEach(
            (v: any, k: number) => {
                this.assStatingWLUnitsDeleteList.push(v);
            }
        );
    }

    nonOffSpecificTaskData() {
        this.nonOffSpeTasksInsertList = [];
        this.nonOffSpeTasksUpdateList = [];
        this.nonOffSpeTasksDeleteList = [];

        this.nonOffSpeTasks.updatedMap.forEach(
            (v: any, k: number) => {
                this.nonOffSpeTasksUpdateList.push(v);
            }
        );
        this.nonOffSpeTasks.addedMap.forEach(
            (v: any, k: number) => {
                this.nonOffSpeTasksInsertList.push(v);
            }
        );
        this.nonOffSpeTasks.removedMap.forEach(
            (v: any, k: number) => {
                this.nonOffSpeTasksDeleteList.push(v);
            }
        );
    }

    onRowClickAssStartingUnits(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableInsert = true;
            } else {
                this.enableInsert = false;
                this.nonOffSpecTaskPosExecuteQuery();
            }
            this.assStartingWlUnitBean = event;
            if (event.staffPosition && event.createDatetime) {
                this.nonOffSpecTaskPosExecuteQuery();
            }
        } else {
            this.enableInsert = false;
        }
    }

    save() {
        this.assStartingWLUnitsData();
        this.nonOffSpecificTaskData();
        this.nonOffSpeTasksCommitBean = new WlNonOffSpecificTasksCommitBean();

        if (this.assStatingWLUnitsInsertList.length > 0) {
            for (let i = 0; i < this.assStatingWLUnitsInsertList.length; i++) {
                if (!this.assStatingWLUnitsInsertList[i].staffPosition) {
                    this.show(this.translateService.translate('ocmdspwd.positionmustbeentered'), 'warn');
                    return;
                }
                if (!this.assStatingWLUnitsInsertList[i].defaultStartingUnits) {
                    this.show(this.translateService.translate('ocmdspwd.defaultstartingunitsmustbeentered'), 'warn');
                    return;
                }
                const index = this.assStatingWLUnitsRowData.indexOf(this.assStatingWLUnitsInsertList[i]);
                for (let j = 0; j < this.assStatingWLUnitsRowData.length; j++) {
                    if (index != j && this.assStatingWLUnitsRowData[j].staffPosition === this.assStatingWLUnitsInsertList[i].staffPosition) {
                        this.show('ocmdspwd.positionisalreadyexists', 'warn');
                        return;
                    }
                }
            }
            this.nonOffSpeTasksCommitBean.startingUnitsInsertList = this.assStatingWLUnitsInsertList;
        }

        if (this.assStatingWLUnitsUpdateList.length > 0) {
            for (let i = 0; i < this.assStatingWLUnitsUpdateList.length; i++) {
                if (!this.assStatingWLUnitsUpdateList[i].staffPosition) {
                    this.show(this.translateService.translate('ocmdspwd.positionmustbeentered'), 'warn');
                    return;
                }
                if (!this.assStatingWLUnitsUpdateList[i].defaultStartingUnits) {
                    this.show(this.translateService.translate('ocmdspwd.defaultstartingunitsmustbeentered'), 'warn');
                    return;
                }
            }
            this.nonOffSpeTasksCommitBean.startingUnitsUpdateList = this.assStatingWLUnitsUpdateList;
        }

        if (this.assStatingWLUnitsDeleteList.length > 0) {
            this.nonOffSpeTasksCommitBean.startingUnitsDeleteList = this.assStatingWLUnitsDeleteList;
        }

        if (this.nonOffSpeTasksInsertList.length > 0) {
            for (let i = 0; i < this.nonOffSpeTasksInsertList.length; i++) {
                if (!this.nonOffSpeTasksInsertList[i].agyLocId) {
                    this.show(this.translateService.translate('ocmdspwd.agencylocationmustbeentered'), 'warn');
                    return;
                }
                if (!this.nonOffSpeTasksInsertList[i].workloadTaskType) {
                    this.show(this.translateService.translate('ocmdspwd.workloadtasktypemustbeentered'), 'warn');
                    return;
                }
                if (!this.nonOffSpeTasksInsertList[i].units) {
                    this.show(this.translateService.translate('ocmdspwd.unitsmustbeentered'), 'warn');
                    return;
                }
                const index = this.nonOffSpeTasksRowData.indexOf(this.nonOffSpeTasksInsertList[i]);
                for (let j = 0; j < this.nonOffSpeTasksRowData.length; j++) {
                    if (index != j && this.nonOffSpeTasksRowData[j].agyLocId === this.nonOffSpeTasksInsertList[i].agyLocId && this.nonOffSpeTasksRowData[j].workloadTaskType === this.nonOffSpeTasksInsertList[i].workloadTaskType) {
                        this.show('ocmdspwd.agylocandwrkloadtaskalreadyexist', 'warn');
                        return;
                    }
                }
                this.nonOffSpeTasksInsertList[i].staffPosition = this.assStartingWlUnitBean.staffPosition;
            }
            this.nonOffSpeTasksCommitBean.insertList = this.nonOffSpeTasksInsertList;
        }
        if (this.nonOffSpeTasksUpdateList.length > 0) {
            for (let i = 0; i < this.nonOffSpeTasksUpdateList.length; i++) {
                if (!this.nonOffSpeTasksUpdateList[i].agyLocId) {
                    this.show(this.translateService.translate('ocmdspwd.agencylocationmustbeentered'), 'warn');
                    return;
                }
                if (!this.nonOffSpeTasksUpdateList[i].workloadTaskType) {
                    this.show(this.translateService.translate('ocmdspwd.workloadtasktypemustbeentered'), 'warn');
                    return;
                }
                if (!this.nonOffSpeTasksUpdateList[i].units) {
                    this.show(this.translateService.translate('ocmdspwd.unitsmustbeentered'), 'warn');
                    return;
                }
            }
            this.nonOffSpeTasksCommitBean.updateList = this.nonOffSpeTasksUpdateList;
        }
        if (this.nonOffSpeTasksDeleteList.length > 0) {
            this.nonOffSpeTasksCommitBean.deleteList = this.nonOffSpeTasksDeleteList;
        }


        const commonSave = this.ocmdspwdService.maintainDefStaffPosWL(this.nonOffSpeTasksCommitBean);
        commonSave.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.assStartingDefWLUnitsExecuteQuery();
            } else if (data === 3) {
                this.show(this.translateService.translate('common.cannotdeletemasterchildrecord'), 'warn');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }

    validateRowDefStartingUnit = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'staffPosition') {
            for (let i = 0; i < this.assStatingWLUnitsRowData.length; i++) {
                for (let j = 0; j < this.assStatingWLUnitsRowData.length; j++) {
                    if (i !== j && this.assStatingWLUnitsRowData[i].staffPosition === this.assStatingWLUnitsRowData[j].staffPosition) {
                        this.show(this.translateService.translate('ocmdspwd.positionisalreadyexists'), 'warn');
                        return;
                    }
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    get saveBtnEnable() {
        if (this.assWorkloadUnits.addedMap.size > 0 || this.assWorkloadUnits.updatedMap.size > 0 ||
            this.assWorkloadUnits.removedMap.size > 0 || this.nonOffSpeTasks.addedMap.size > 0 || this.nonOffSpeTasks.updatedMap.size > 0 ||
            this.nonOffSpeTasks.removedMap.size > 0) {
            return false;
        } else {
            return true;
        }
    }
}