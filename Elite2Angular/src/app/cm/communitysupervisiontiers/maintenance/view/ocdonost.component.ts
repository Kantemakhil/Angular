import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { OcdonostService } from '../service/ocdonost.service';
import { WlOfficerNonOffSpecificTasks } from '../beans/WlOfficerNonOffSpecificTasks';
import { WlOfficerNonOffSpecificTasksCommitBean } from '@cm/communitysupervisiontiers/maintenance/beans/WlOfficerNonOffSpecificTasksCommitBean'

@Component({
    selector: 'app-ocdonost',
    templateUrl: './ocdonost.component.html',
})
export class OcdonostComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('nonOffSpecTaskGrid', { static: true }) nonOffSpecTaskGrid: any;
    msgs: any[];
    assStatingWLUnitsRowData: WlOfficerNonOffSpecificTasks[] = [];
    assStatingWLUnitsColumnDef: any[] = [];
    staffName: string;
    staffId: number;
    fteStatus: number;
    offPosition: string;
    defaultStatingUnits: number;
    agyLocId: string;
    offAvailableUnits: number;
    sumOfUnits = 0;
    fteStatusTemp : number;
    officerNonOffSpeModel: WlOfficerNonOffSpecificTasks = new WlOfficerNonOffSpecificTasks();
    officeNonOffSpeTaskInsertList: WlOfficerNonOffSpecificTasks[] = [];
    officeNonOffSpeTaskUpdateList: WlOfficerNonOffSpecificTasks[] = [];
    officeNonOffSpeTaskDeleteList: WlOfficerNonOffSpecificTasks[] = [];
    nonOffSpeTasksCommitBean = new WlOfficerNonOffSpecificTasksCommitBean();
    constructor(public translateService: TranslateService, private ocdonostService: OcdonostService) {

    }
    ngOnInit() {
        this.officerNonOffSpeModel.staffId = this.dialog['data'].sacStaffId;
        this.fteStatus = this.dialog['data'].fteStatus;
        this.officerNonOffSpeModel.staffLocRoleId = this.dialog['data'].staffLocRoleId;
        this.officerNonOffSpeModel.staffPosition = this.dialog['data'].position;
        this.officerNonOffSpeModel.agyLocId = this.dialog['data'].calAgyLocId;
        this.officerNonOffSpeModel.staffRole = this.dialog['data'].role;
        this.officerNonOffSpeModel.fromDate = this.dialog['data'].fromDate;
        this.officerNonOffSpeModel.availableUnits = this.dialog['data'].fteStatus;

        this.assStatingWLUnitsColumnDef = [
            {
                fieldName: this.translateService.translate('ocdonost.nonoffenderspecifictasks'), field: 'workloadTaskType', editable: true, width: 150,
                datatype: 'lov', domain: 'WRKLD_TASK', required: true, cellEditable: this.workloadCellEdit,
                titles: {
                    description: this.translateService.translate('common.description'),
                    code: this.translateService.translate('common.code')
                }
            },
            {
                fieldName: this.translateService.translate('ocdonost.units'), field: 'units', editable: true, width: 150, required: true,
                datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('ocdonost.active'), field: 'activeFlag', editable: true, width: 150,
                datatype: 'checkbox',
            }
        ];
        this.getStaffNameOffNonOffSpecTask();
    }

    getStaffNameOffNonOffSpecTask() {
        this.ocdonostService.getStaffName(this.officerNonOffSpeModel).subscribe(data => {
            if (data) {
                this.staffName = data.staffPosition;
                if (this.fteStatus == null) {
                    this.fteStatusTemp = 1;
                } else {
                    this.fteStatusTemp = this.fteStatus;
                }
                this.defaultStatingUnits = Number(this.fteStatusTemp * data.units);
                if (this.staffName) {
                    this.getNonOffenderSpecificTasks();
                }
            }
        });
    }
    getNonOffenderSpecificTasks() {
        const nonOffdata = this.ocdonostService.getNonOffenderSpecificTasks(this.officerNonOffSpeModel);
        nonOffdata.subscribe(data => {
            if (data.length === 0) {
                this.assStatingWLUnitsRowData = [];
                this.offAvailableUnits = this.defaultStatingUnits;
            } else {
                data.forEach(ele => {
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                });
                this.assStatingWLUnitsRowData = data;
                this.offAvailableUnits = data[0].availableUnits;
            }
        });
    }

    onButExitclick() {
        this.dialog.close(null);
    }

    workloadCellEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    nonOffSpecTaskAssigning() {
        this.officeNonOffSpeTaskInsertList = [];
        this.officeNonOffSpeTaskUpdateList = [];
        this.officeNonOffSpeTaskDeleteList = [];

        this.nonOffSpecTaskGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.officeNonOffSpeTaskInsertList.push(v);
            }
        );
        this.nonOffSpecTaskGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.officeNonOffSpeTaskUpdateList.push(v);
            }
        );
        this.nonOffSpecTaskGrid.removedMap.forEach(
            (v: any, k: number) => {
                this.officeNonOffSpeTaskDeleteList.push(v);
            }
        );
    }

    onSave() {
        this.nonOffSpecTaskAssigning();
        this.nonOffSpeTasksCommitBean = new WlOfficerNonOffSpecificTasksCommitBean();
        if (this.officeNonOffSpeTaskInsertList.length > 0) {
            for (let i = 0; i < this.officeNonOffSpeTaskInsertList.length; i++) {
                if (!this.officeNonOffSpeTaskInsertList[i].workloadTaskType) {
                    this.show(this.translateService.translate('ocdonost.nonoffenderspecifictasksmustbeenterd'), 'warn');
                    return;
                }
                if (!this.officeNonOffSpeTaskInsertList[i].units) {
                    this.show(this.translateService.translate('ocmdspwd.unitsmustbeentered'), 'warn');
                    return;
                }
                const index = this.assStatingWLUnitsRowData.indexOf(this.officeNonOffSpeTaskInsertList[i]);
                for (let j = 0; j < this.assStatingWLUnitsRowData.length; j++) {
                    if (index != j && this.assStatingWLUnitsRowData[j].workloadTaskType === this.officeNonOffSpeTaskInsertList[i].workloadTaskType) {
                        this.show('ocdonost.nonoffenderspecifictaskalreadyexist', 'warn');
                        return;
                    }
                }
                this.officeNonOffSpeTaskInsertList[i].staffPosition = this.dialog['data'].position;
                this.officeNonOffSpeTaskInsertList[i].staffLocRoleId = this.dialog['data'].staffLocRoleId;
                this.officeNonOffSpeTaskInsertList[i].agyLocId = this.dialog['data'].calAgyLocId;
                this.officeNonOffSpeTaskInsertList[i].activeFlag = (this.officeNonOffSpeTaskInsertList[i].activeFlag) ? 'Y' : 'N';
            }
            this.nonOffSpeTasksCommitBean.insertList = this.officeNonOffSpeTaskInsertList;
        }
        if (this.assStatingWLUnitsRowData.length > 0) {
            this.sumOfUnits = 0;
            this.assStatingWLUnitsRowData.forEach(ele => {
                this.sumOfUnits = Number(this.sumOfUnits) + Number(ele.units);
            });
            this.nonOffSpeTasksCommitBean.availableWLUnits = this.defaultStatingUnits - this.sumOfUnits;
        }
        if (this.officeNonOffSpeTaskUpdateList.length > 0) {
            this.sumOfUnits = 0;
            for (let i = 0; i < this.officeNonOffSpeTaskUpdateList.length; i++) {
                if (!this.officeNonOffSpeTaskUpdateList[i].workloadTaskType) {
                    this.show(this.translateService.translate('ocdonost.nonoffenderspecifictasksmustbeenterd'), 'warn');
                    return;
                }
                if (!this.officeNonOffSpeTaskUpdateList[i].units) {
                    this.show(this.translateService.translate('ocmdspwd.unitsmustbeentered'), 'warn');
                    return;
                }
                if(this.officeNonOffSpeTaskUpdateList[i].activeFlag == 'false'){
                    this.sumOfUnits = Number(this.sumOfUnits) + Number(this.officeNonOffSpeTaskUpdateList[i].units);
                }
                this.officeNonOffSpeTaskUpdateList[i].staffPosition = this.dialog['data'].position;
                this.officeNonOffSpeTaskUpdateList[i].staffLocRoleId = this.dialog['data'].staffLocRoleId;
                this.officeNonOffSpeTaskUpdateList[i].agyLocId = this.dialog['data'].calAgyLocId;
                this.officeNonOffSpeTaskUpdateList[i].activeFlag = (this.officeNonOffSpeTaskUpdateList[i].activeFlag) ? 'Y' : 'N';
            }
            this.nonOffSpeTasksCommitBean.updateList = this.officeNonOffSpeTaskUpdateList;
        }
        if (this.officeNonOffSpeTaskDeleteList.length > 0) {
            this.nonOffSpeTasksCommitBean.deleteList = this.officeNonOffSpeTaskDeleteList;
        }
        const commonSave = this.ocdonostService.offNonOffSpeTaskCommit(this.nonOffSpeTasksCommitBean);
        commonSave.subscribe(data => {
            if (data == 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.getNonOffenderSpecificTasks();
                this.getStaffNameOffNonOffSpecTask();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }

    get saveBtnEnable() {
        if (this.nonOffSpecTaskGrid.addedMap.size > 0 || this.nonOffSpecTaskGrid.updatedMap.size > 0 ||
            this.nonOffSpecTaskGrid.removedMap.size > 0) {
            return false;
        } else {
            return true;
        }
    }
}