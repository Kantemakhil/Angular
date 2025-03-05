import {
    Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

import { CasePlanStaff } from '@inst/casemanagement/beans/CasePlanStaff';
import { CasePlanStaffCommitBean } from '@inst/casemanagement/beans/CasePlanStaffCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ReferenceCodes } from '@common/beans/ReferenceCodes';
import { OcdiplacService } from '../service/ocdiplac.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';



@Component({

    templateUrl: './ocdiplac.component.html',
    providers: [],
    selector: 'OcdiplacComponent'
})


export class OcdiplacComponent implements OnInit {
    smcpRowdata: CasePlanStaff[] = [];
    smcpColumnDefs: any[] = [];
    selectedIndex: number = -1;
    msgs = [];
    msglist = [];
    type: string;
    message: string;
    disabled: boolean;
    casePlanStaff: CasePlanStaff = new CasePlanStaff();
    casePlanStaffCommitBean: CasePlanStaffCommitBean = new CasePlanStaffCommitBean();
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;

    insertList: CasePlanStaff[] = [];
    updateList: CasePlanStaff[] = [];
    duplicateFlag: boolean = false;
    smcpRowdataTemp: CasePlanStaff[] = [];
    agyLocId: any;
    staffCasePlanList: ReferenceCodes[] = [];
    count: number = 0;
    assignBtn: boolean;
    asignInsert: boolean;
    sysPflModelTemp: SystemProfiles = new SystemProfiles();
    cpMultipleCount: number;
    constructor(public translateService: TranslateService, public sessionManager: UserSessionManager,
        public dialogService: DialogService, public ocdiplacService: OcdiplacService, private oumsypflFactory: OumsypflService) {

    }

    ngOnInit(): void {
        this.agyLocId = this.dialog.data.agyLocId;
        this.disabled = true;
        if (this.dialog.data.creationDate) {
            if (this.dialog.data.casePlanStatusDesc == 'CLOSED') {
                this.assignBtn = true;
                this.asignInsert = false;
            } else {
                this.assignBtn = false;
                this.asignInsert = true;
            }

        } else {
            this.assignBtn = false;
            this.asignInsert = true;
        }
        this.smcpColumnDefs = [
            {
                fieldName: this.translateService.translate('ocdiplac.staffName'), required: true,
                field: 'staffId', width: 200, datatype: 'lov', link: 'ocdiplac/staffMemebersListByAgyLocId?agyLocId=' + this.agyLocId,
                source: 'OUMSMALA', cellEditable: this.canCellEditing
            },
            {
                fieldName: this.translateService.translate('ocdiplac.caseplanRole'), required: true,
                field: 'casePlanRole', width: 200, datatype: 'lov', domain: 'CPLAN_ROLE', cellEditable: this.canCellEditing,
            },
            {
                fieldName: this.translateService.translate('ocdiplac.cpowner'), cellEditable: this.canCellEdit,
                field: 'cpOwner', width: 200, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocdiplac.cnofficer'), cellEditable: this.canCellEdit,
                field: 'cnOfficer', width: 200, datatype: 'checkbox'
            },

            {
                fieldName: this.translateService.translate('ocdiplac.activeFlag'), cellEditable: this.canCellEdit,
                field: 'activeFlag', width: 200, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocdiplac.startDate'), cellEditable: this.canCellEditing,
                field: 'startDate', width: 400, datatype: 'date',
            },
            {
                fieldName: this.translateService.translate('ocdiplac.endDate'),
                field: 'endDate', width: 200, datatype: 'date', cellEditable: this.canCellEditEndDate
            },
            {
                field: 'operation', hide: true
            }

        ];
        if (!this.dialog.data.casePlanId) {
            this.childDataCarry();
        } else {
            this.getAllStaffMembersList();
        }
        this.staffMemebersListByAgyLocId();

        this.systemProfileExecuteQuery();
    }
    staffMemebersListByAgyLocId() {
        const result = this.ocdiplacService.staffMemebersListByAgyLocId(this.agyLocId);
        result.subscribe(data => {
            this.staffCasePlanList = data;
        });

    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (this.dialog.data.creationDate && this.dialog.data.casePlanStatusDesc == 'CLOSED') {
            return false;
        }
        else if (this.dialog.data.creationDate && this.dialog.data.casePlanStatusDesc == 'ACTIVE') {
            return true;
        }
        else {
            return true;
        }
    }
    canCellEditing = (data: any, index: number, field: string): boolean => {
        if (this.dialog.data.creationDate && this.dialog.data.casePlanStatusDesc == 'CLOSED') {
            return false;
        }
        else if (data.activeFlag) {
            return true;
        } else {
            return false;
        }

    }
    canCellEditEndDate = (data: any, index: number, field: string): boolean => {
        if (this.dialog.data.creationDate && this.dialog.data.casePlanStatusDesc == 'CLOSED') {
            return false;
        }
        else if (data.activeFlag) {
            return false;
        } else {
            return true;
        }
    }

    validateRow = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event && event.field === 'activeFlag') {
            if (event && event.data.cnOfficer && (!event.data.activeFlag)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplac.cannotdeactivatePrimaryStaff');
                this.show();
                this.grid.setColumnData('activeFlag', event.rowIndex, true);
                return rowdata;
            }
            if (event && event.data.cpOwner && (!event.data.activeFlag)) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplac.youcannotdeactivateactivecpowner');
                this.show();
                this.grid.setColumnData('activeFlag', event.rowIndex, true);
                return rowdata;
            }
            
            if (event.field === 'activeFlag' && !(event.data.activeFlag)) {
                this.grid.setColumnData('endDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            } else {
                this.grid.setColumnData('endDate', rowIndex, undefined);
            }
            /* (event.data.activeFlag) ? this.grid.setColumnData('endDate', rowIndex, null) :
                this.grid.setColumnData('endDate', rowIndex, DateFormat.getDate()); */
        }
        if (event && event.field === 'cnOfficer') {
            if (event.data.activeFlag) {
                this.count = 0;

                for (let i = 0; i < this.smcpRowdata.length; i++) {
                    if (this.smcpRowdata[i].cnOfficer && i !== rowIndex) {
                        this.count = this.count + 1;
                    }
                }
                if (this.count !== 0 && event.data.cnOfficer === true) {
                    const labelMsg = {
                        label: this.translateService.translate('ocdiplac.cnOfficerChange'), yesBtn: true, proceedWithNoConflictsBtn: false, noBtn: true,
                        proceedBtnDisabled: true
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', labelMsg, 30).subscribe(result => {
                        if (result) {
                            for (let i = 0; i < this.smcpRowdata.length; i++) {
                                if (this.smcpRowdata[i].cnOfficer) {
                                    this.grid.setColumnData('cnOfficer', i, false);
                                }
                            }
                            this.grid.setColumnData('cnOfficer', event.rowIndex, true);
                        } else {
                            this.grid.setColumnData('cnOfficer', event.rowIndex, false);
                        }
                    });
                }
            }
            else {
                if (event.data.cnOfficer) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplac.cannotcheckprimaryKeyforInactiveCasePlan');
                    this.show();
                    this.grid.setColumnData('cnOfficer', event.rowIndex, false);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }

        if (event && event.field === 'cpOwner') {
            if (event.data.activeFlag) {
                this.count = 0;
                if (this.cpMultipleCount === 0) {
                    for (let i = 0; i < this.smcpRowdata.length; i++) {
                        if (this.smcpRowdata[i].cpOwner && i !== rowIndex) {
                            this.count = this.count + 1;
                        }
                    }
                    if (this.count !== 0 && event.data.cpOwner === true) {
                        const labelMsg = {
                            label: this.translateService.translate('ocdiplac.cpOwnerChange'), yesBtn: true, proceedWithNoConflictsBtn: false, noBtn: true,
                            proceedBtnDisabled: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', labelMsg, 30).subscribe(result => {
                            if (result) {
                                for (let i = 0; i < this.smcpRowdata.length; i++) {
                                    if (this.smcpRowdata[i].cpOwner) {
                                        this.grid.setColumnData('cpOwner', i, false);
                                    }
                                }
                                this.grid.setColumnData('cpOwner', event.rowIndex, true);
                            } else {
                                this.grid.setColumnData('cpOwner', event.rowIndex, false);
                            }
                        });
                    }
                } else if (this.cpMultipleCount === 1) {
                    if (event.data.cpOwner === true) {
                        this.grid.setColumnData('cpOwner', event.rowIndex, true);
                    } else {
                        this.grid.setColumnData('cpOwner', event.rowIndex, false);
                    }

                }
            }
            else {
                if (event.data.cpOwner) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdiplac.cannotcpOwnerforInactiveCasePlan');
                    this.show();
                    this.grid.setColumnData('cpOwner', event.rowIndex, false);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }
        this.grid.setColumnData('operation', event.rowIndex, 'Y');
        rowdata.validated = true;
        return rowdata;

    }

    onRowClick(event) {

    }

    onGridInsert = () => {

        return {
            activeFlag: true, startDate: DateFormat.getDate()
        }
    }

    cancel() {
        this.dialog.close(null);
    }


    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    select() {
        this.insertList = [];
        this.updateList = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.insertList.push(v);
            }
        );
        this.updateList = [];
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.updateList.push(v);
            }
        );
        this.duplicateFlag = true;
        var tempCount = 0;
        var cpTempCount = 0;
        for (let i = 0; i < this.smcpRowdata.length; i++) {
            if (this.smcpRowdata[i].cnOfficer)
                tempCount++;
            for (let j = 0; j < this.smcpRowdata.length; j++) {
                if (i !== j && (this.smcpRowdata[i].staffId === this.smcpRowdata[j].staffId)) {
                    this.duplicateFlag = false;
                    break;
                }
            } if (!this.duplicateFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdiplac.staffandcaseplanRole');
                this.show();
                this.duplicateFlag = false;
                return;
            }
            if(this.smcpRowdata[i].cpOwner){
                cpTempCount++;
            }
        }
        if (cpTempCount === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdiplac.atleastonecpownershouldbechecked');
            this.show();
            return;
        }
        if(this.cpMultipleCount == 0 && cpTempCount >1){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdiplac.onlyonecpownercanbeallowedtocheck');
            this.show();
            return;
        }
        if (tempCount === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdiplac.atleastonecnofficercheck');
            this.show();
            return;
        }
        if (this.duplicateFlag) {
            this.casePlanStaffCommitBean.insertList = [];

            this.casePlanStaffCommitBean.updateList = [];

            if (this.insertList !== null && this.insertList.length > 0) {
                for (let i = 0; i < this.insertList.length; i++) {
                    if (this.insertList[i].startDate && this.insertList[i].startDate != null)
                        this.insertList[i].startDate = DateFormat.getDate(this.insertList[i].startDate);

                    if (!this.insertList[i].staffId) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.staffNameMustBeEntered');
                        this.show();
                        return;
                    }

                    if (!this.insertList[i].casePlanRole) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.casePlanRoleMustBeEntered');
                        this.show();
                        return;
                    }


                    if (this.insertList[i].startDate && DateFormat.compareDate(DateFormat.getDate(this.insertList[i].startDate),
                        DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.startDatecannotbelater');
                        this.show();
                        return;
                    }
                    if (this.insertList[i].endDate && DateFormat.compareDate(DateFormat.getDate(this.insertList[i].endDate),
                        DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.enddatecannotfeture');
                        this.show();
                        return;
                    }
                    if (this.insertList[i].startDate && this.insertList[i].endDate &&
                        this.insertList[i].startDate && DateFormat.compareDate(DateFormat.getDate(this.insertList[i].endDate),
                            DateFormat.getDate(this.insertList[i].startDate)) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.enddatecannotearilerthenstartdate');
                        this.show();
                        return;
                    }
                    this.insertList[i].activeFlag = this.insertList[i].activeFlag ? 'Y' : 'N';
                    this.insertList[i].cnOfficer = this.insertList[i].cnOfficer ? 'Y' : 'N';
                    this.insertList[i].cpOwner = this.insertList[i].cpOwner ? 'Y' : 'N';

                }
                this.casePlanStaffCommitBean.insertList = this.insertList;
            }
            if (this.updateList !== null && this.updateList.length > 0) {
                for (let i = 0; i < this.updateList.length; i++) {
                    this.updateList[i].createDatetime = DateFormat.getDate(this.updateList[i].createDatetime);
                    if (this.updateList[i].startDate !== null)
                        this.updateList[i].startDate = DateFormat.getDate(this.updateList[i].startDate);
                    if (this.updateList[i].endDate !== null)
                        this.updateList[i].endDate = DateFormat.getDate(this.updateList[i].endDate);

                    if (!this.updateList[i].staffId) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.staffNameMustBeEntered');
                        this.show();
                        return;
                    }

                    if (!this.updateList[i].casePlanRole) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.casePlanRoleMustBeEntered');
                        this.show();
                        return;
                    }

                    if (this.updateList[i].startDate && DateFormat.compareDate(DateFormat.getDate(this.updateList[i].startDate),
                        DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.startDatecannotbelater');
                        this.show();
                        return;
                    }
                    if (this.updateList[i].endDate && DateFormat.compareDate(DateFormat.getDate(this.updateList[i].endDate),
                        DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.enddatecannotfeture');
                        this.show();
                        return;
                    }
                    if (this.updateList[i].startDate && this.updateList[i].endDate && DateFormat.compareDate(DateFormat.getDate(this.updateList[i].startDate),
                        DateFormat.getDate(this.updateList[i].endDate)) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocdiplac.enddatecannotearilerthenstartdate');
                        this.show();
                        return;
                    }
                    this.updateList[i].activeFlag = this.updateList[i].activeFlag ? 'Y' : 'N';
                    this.updateList[i].cnOfficer = this.updateList[i].cnOfficer ? 'Y' : 'N';
                    this.updateList[i].cpOwner = this.updateList[i].cpOwner ? 'Y' : 'N';
                }
                // this.casePlanStaffCommitBean.updateList = this.updateList;
            }
            this.updateList.forEach(ele => {
                this.insertList.push(ele);
            });

            for (let k = 0; k < this.smcpRowdata.length; k++) {
                if (this.smcpRowdata[k].startDate !== null)
                    this.smcpRowdata[k].startDate = DateFormat.getDate(this.smcpRowdata[k].startDate);
                if (this.smcpRowdata[k].endDate !== null)
                    this.smcpRowdata[k].endDate = DateFormat.getDate(this.smcpRowdata[k].endDate);
                this.smcpRowdata[k].activeFlag = (this.smcpRowdata[k].activeFlag === true) ? 'Y' : (this.smcpRowdata[k].activeFlag === false) ? 'N' : this.smcpRowdata[k].activeFlag;
                this.smcpRowdata[k].cnOfficer = (this.smcpRowdata[k].cnOfficer === true) ? 'Y' : this.smcpRowdata[k].cnOfficer === false ? 'N' : this.smcpRowdata[k].cnOfficer;
                this.smcpRowdata[k].cpOwner = (this.smcpRowdata[k].cpOwner === true) ? 'Y' : this.smcpRowdata[k].cpOwner === false ? 'N' : this.smcpRowdata[k].cpOwner;
                this.smcpRowdata[k].staffName = this.staffCasePlanList.filter(ele => ele.code === this.smcpRowdata[k].staffId)[0].description;
            }

            this.dialog.close({
                data: this.smcpRowdata
            });
        }

    }
    getAllStaffMembersList() {
        const result = this.ocdiplacService.getAllStaffMembersList(this.dialog.data.offenderBookId, this.dialog.data.casePlanId);
        result.subscribe(data => {
            if (data.length == 0) {
                this.smcpRowdata = [];
            } else {
                this.smcpRowdata = data;
                this.smcpRowdata.forEach(ele => {
                    ele.activeFlag = (ele.activeFlag === 'Y') ? true : false;
                    ele.cnOfficer = (ele.cnOfficer === 'Y') ? true : false;
                    ele.cpOwner = (ele.cpOwner === 'Y') ? true : false;
                });
                this.smcpRowdataTemp = this.smcpRowdata;
                this.selectedIndex = 0;
            }

        });

    }
    onGridClear = () => {
        if (!this.dialog.data.casePlanId) {
            this.childDataCarry();
        } else {
            this.getAllStaffMembersList();
        }
        return true;
    }

    childDataCarry() {
        const result = this.ocdiplacService.childDataCarry(this.dialog.data.offenderBookId);
        result.subscribe(data => {
            if (data.length == 0) {
                this.smcpRowdata = [];
            } else {
                this.smcpRowdata = data;
                this.smcpRowdata.forEach(ele => {
                    ele.activeFlag = (ele.activeFlag === 'Y') ? true : false;
                    ele.cnOfficer = (ele.cnOfficer === 'Y') ? true : false;
                    ele.cpOwner = (ele.cpOwner === 'Y') ? true : false;
                });
                this.smcpRowdataTemp = this.smcpRowdata;
                this.selectedIndex = 0;
            }
        });
    }

    systemProfileExecuteQuery() {
        this.sysPflModelTemp.profileCode = 'CP_LMT_CPOWN';
        this.sysPflModelTemp.profileType = 'CLIENT';
        const syspflResult = this.oumsypflFactory.getSystemProfileRecords(this.sysPflModelTemp);
        syspflResult.subscribe(data => {
            if (data.length > 0) {
                if (data[0].profileValue === "Y" || data[0].profileValue === "y") {
                    this.cpMultipleCount = 1;
                    console.log('Cp Limit Count Configured Y' + this.cpMultipleCount);
                } else {
                    this.cpMultipleCount = 0;
                    console.log('Cp Limit Count Configured other than Y' + this.cpMultipleCount);
                }
            } else {
                this.cpMultipleCount = 0;
                console.log('Cp Limit Count not Configured any thing' + this.cpMultipleCount);
            }
        });
    }
}
