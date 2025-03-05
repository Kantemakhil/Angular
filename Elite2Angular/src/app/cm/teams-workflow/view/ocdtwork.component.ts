import {
    Component, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdtworkService } from '../service/ocdtwork.service';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { TagWorkflowBrowseQueueCommitBean } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueueCommitBean';
import { TeamMembers } from '@cm/teams-workflow/beans/TeamMembers';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ocdtwork',
    templateUrl: './ocdtwork.component.html'
})

export class OcdtworkComponent implements OnInit, OnDestroy {
    checkMemoCount: any;
    checkTaskCount: number;
    allWorkCb: boolean;
    workAssignData: TagWorkflowBrowseQueue[] = [];
    gridupdate: boolean;
    @ViewChild('grid', {static: true}) grid: any;
    @ViewChild('gridMemo', {static: true}) gridMemo: any;
    @ViewChild('dataGrid', {static: true}) dataGrid: any;
    staffmemoqueueCommitModel: TagWorkflowBrowseQueueCommitBean = new TagWorkflowBrowseQueueCommitBean();
    assignedTeamIdValue: any;
    assignedTeamDescription: any;
    assignFlagDisable: boolean;
    teamMembersTitles = { description: 'Last Name', firstName: 'First Name', code: 'Staff Id' };
    assignctrlModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    teamctrlModel: TeamMembers = new TeamMembers();
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    staffqueueData: TagWorkflowBrowseQueue[] = [];
    staffqueueDataTemp: TagWorkflowBrowseQueue[] = [];
    staffqueueModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    staffqueueIndex = -1;
    staffqueueInsertList: TagWorkflowBrowseQueue[] = [];
    staffqueueUpdatetList: TagWorkflowBrowseQueue[] = [];
    staffqueueDeleteList: TagWorkflowBrowseQueue[] = [];
    staffmemoqueueData: TagWorkflowBrowseQueue[] = [];
    staffmemoqueueDataTemp: TagWorkflowBrowseQueue[] = [];
    staffmemoqueueModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    staffmemoqueueIndex = -1;
    staffmemoqueueInsertList: TagWorkflowBrowseQueue[] = [];
    staffmemoqueueUpdatetList: TagWorkflowBrowseQueue[] = [];
    staffmemoqueueDeleteList: TagWorkflowBrowseQueue[] = [];
    teammembersData: TeamMembers[] = [];
    teammembersDataTemp: TeamMembers[] = [];
    teammembersModel: TeamMembers = new TeamMembers();
    teammembersIndex = -1;
    teammembersInsertList: TeamMembers[] = [];
    teammembersUpdatetList: TeamMembers[] = [];
    teammembersDeleteList: TeamMembers[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    staffQueueColumnDef: any[];
    staffMemoQueueColumnDef: any[];
    teamMembersColumnDef: any[];
    rgreasonRg: any[] = [];
    rgcompletedRg: any[] = [];
    cgfkCrtmvtmpagylocidRg: any[] = [];
    rgsexRg: any[] = [];
    rgworktypeRg: any[] = [];
    rgworksubtypeRg: any[] = [];
    rgpositionRg: any[] = [];
    rgroleRg: any[] = [];
    rgteamstaffRg: any[] = [];
    rgstaffsearchRg: any[] = [];
    exitLaunchBtn = false;
    lastNameLink: string;
    lovReadOnly: boolean;
    clearDisabled: boolean;
    saveDisabled: boolean;
    retriveDisabled: boolean;
    Valid: boolean;
    validateStaffQueueFalg: boolean;
    validateStaffMemoQueueFlag: boolean;
    checkTaskCountOne: number;
    teamFlag: boolean;
    tableIndex: number;
    checkboxHide: boolean;
    checkboxOneHide: boolean;
    label: string;
    constructor(private ocdtworkFactory: OcdtworkService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService,
        private router: Router, private ocdmworkFactory: OcdmworkService) {
        this.staffQueueColumnDef = [];
        this.staffMemoQueueColumnDef = [];
        this.teamMembersColumnDef = [];
    }
    ngOnInit() {
       
        this.checkboxHide = true;
        this.checkboxOneHide = false;
        this.gridupdate = true;
        this.validateStaffQueueFalg = false;
        this.validateStaffMemoQueueFlag = false;
        this.saveDisabled = true;
        this.clearDisabled = false;
        this.retriveDisabled = true;
        this.lovReadOnly = true;
        if (this.ocdmworkFactory.exitFlag) {
            this.exitLaunchBtn = true;
        }
        this.staffQueueColumnDef = [
            {
                fieldName: this.translateService.translate('common.transfer'), field: 'assignedFlag', datatype: 'checkbox', editable: true,
                width: 150, cellEditable: this.canFlagsEdit
            },
            {
                fieldName: this.translateService.translate('common.assigndate'), field: 'assignmentDate', editable: false,
                datatype: 'date', width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.tasktype'), field: 'workType', datatype: 'lov', domain: 'TASK_TYPE',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.subtype'), field: 'workSubType', datatype: 'lov', domain: 'TASK_SUBTYPE',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.details'), field: 'messageText', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', datatype: 'date',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.complete'), field: 'completeFlag', datatype: 'checkbox',
                editable: true, width: 150
            },
            {
                fieldName: '', field: 'butIwp', datatype: 'launchbutton', link: '/OIUIWPVE', data: 'row', modal: true, editable: true,
                width: 150, cellEditable: this.canFlagsEdit, updateField: 'row',
            }
        ];
        this.staffMemoQueueColumnDef = [
            {
                fieldName: this.translateService.translate('common.transfer'), field: 'assignedFlag', datatype: 'checkbox',
                editable: true, width: 150, cellEditable: this.canFlagsEdit
            },
            {
                fieldName: this.translateService.translate('common.assigndate'), field: 'assignmentDate', datatype: 'date',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.memotype'), field: 'workType', datatype: 'lov', domain: 'TASK_TYPE',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.subtype'), field: 'workSubType', datatype: 'lov', domain: 'TASK_SUBTYPE',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.details'), field: 'messageText', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', datatype: 'date',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.complete'), field: 'completeFlag', datatype: 'checkbox',
                editable: true, width: 150, cellEditable: this.canFlagsEdit
            },
        ];
        this.teamMembersColumnDef = [
            {
                fieldName: this.translateService.translate('common.assign'), field: 'assignFlag', datatype: 'checkbox', editable: true,
                width: 150
            },
            { fieldName: this.translateService.translate('common.officername'), field: 'lastName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.position'), field: 'position', datatype: 'lov',
                domain: 'STAFF_POS', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.role'), field: 'role', datatype: 'lov',
                domain: 'STAFF_ROLE',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.gender'), field: 'gender', datatype: 'lov',
                domain: 'SEX', editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.workload'), field: 'noOfTasks', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.team'), field: 'teamName', editable: false,
                width: 150
            },
        ];
        this.assignFlagDisable = true;
        this.disabled = true;
        this.onButTaskHistclick();
    }
    onRowClickstaffqueue(event) {
        if (event) {
            this.staffqueueModel = event;
            if (!this.staffqueueModel.assignedFlag) {
                this.staffqueueModel.assignedFlag = false;
            }
        }
    }
    onButTaskHistclick() {
        if (this.sessionManager.currentCaseLoadType === 'COMM') {
            this.label = this.translateService.translate('system-profile.comm-agency');
        } else {
            this.label = this.translateService.translate('system-profile.inst-agency');
        }
    }
    allowNumbers(event) {
    }
    onRowClickstaffmemoqueue(event) {
        if (event) {
            this.staffmemoqueueModel = event;
            if (!this.staffmemoqueueModel.assignedFlag) {
                this.staffmemoqueueModel.assignedFlag = false;
            }
        }
    }
    onRowClickteammembers(event) {
        if (event) {
            this.teammembersModel = event;
            if (!this.teammembersModel.assignFlag) {
                this.teammembersModel.assignFlag = false;
            }
        }
    }
    onSkillsButclick() {
        this.dialogService.openLinkDialog('/OUMSTAFC', this.teammembersModel, 80).subscribe(result => {
        });
    }
    get saveFlag() {

        return true;
    }

    canFlagsEdit = (data: any, index: number, field: string): boolean => {
        if (data.completeFlag && data.completeFlag === 'N') {
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
            this.show();
            return false;
        }
        if (data.assignedFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
            this.show();
            return false;
        }
        return true;
    }

    canTeamFlagsEdit = (data: any, index: number, field: string): boolean => {
        if (this.workAssignData.length > 0 && field === 'assignFlag') {
            if (this.staffqueueModel && this.staffqueueModel.assignedFlag && !this.assignctrlModel.assignOtherTeam) {
                return true;
            }
            if (this.staffmemoqueueModel && this.staffmemoqueueModel.assignedFlag && !this.assignctrlModel.assignOtherTeam) {
                return true;
            }
        }
        return false;
    }

    retrivebtn() {
        this.staffqueueExecuteQuery();
        this.staffmemoqueueExecuteQuery();
        this.retriveDisabled = true;
        this.clearDisabled = false;
    }

    onClear() {
        this.allWorkCb = false;
        this.workAssignData = [];
        this.staffqueueData = [];
        this.staffmemoqueueData = [];
        this.teammembersData = [];
        this.teamFlag = false;
        this.assignctrlModel = new TagWorkflowBrowseQueue();
        this.staffqueueModel = new TagWorkflowBrowseQueue();
        this.staffmemoqueueModel = new TagWorkflowBrowseQueue();
        this.teammembersExecuteQuery();
        this.saveDisabled = true;
        this.clearDisabled = true;
        this.retriveDisabled = false;
        this.assignedTeamDescription = undefined;
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    ocuwkhtyLaunch = () => {
        this.dialogService.openLinkDialog('/OCUWKHTY', this.staffqueueModel, 80).subscribe(result => {

            });
        }
    staffqueueExecuteQuery() {
        this.staffqueueModel = new TagWorkflowBrowseQueue();
        this.staffqueueModel.staffId = this.teamctrlModel.staffId;
        const staffqueueResult = this.ocdtworkFactory.staffQueueExecuteQuery(this.staffqueueModel);
        staffqueueResult.subscribe(staffqueueResultList => {
            if (staffqueueResultList.length === 0) {
                this.staffqueueData = [];
            } else {
                // for (let i = 0; i < staffqueueResultList.length; i++) {
                //     staffqueueResultList[i].butIwp = 'D';
                //     this.workAssignData.push(staffqueueResultList[i]);
                // }
                staffqueueResultList.forEach(element => {
                    element['butIwp'] = 'D';
                    this.workAssignData.push(element);
                });
                this.staffqueueData = staffqueueResultList;
                this.staffqueueModel = staffqueueResultList[0];
                this.clearDisabled = false;
                this.tableIndex = 0;
                this.assignFlagDisable = false;
                this.disabled = false;
            }
        });
    }

    staffmemoqueueExecuteQuery() {
        this.staffmemoqueueModel = new TagWorkflowBrowseQueue();
        this.staffmemoqueueModel.staffId = this.teamctrlModel.staffId;
        const staffmemoqueueResult = this.ocdtworkFactory.
            staffMemoQueueExecuteQuery(this.staffmemoqueueModel);
        staffmemoqueueResult.subscribe(staffmemoqueueResultList => {
            if (staffmemoqueueResultList.length === 0) {
                this.staffmemoqueueData = [];
            } else {
                for (let i = 0; i < staffmemoqueueResultList.length; i++) {
                    this.workAssignData.push(staffmemoqueueResultList[i]);
                }
                this.staffmemoqueueData = staffmemoqueueResultList;
                this.staffmemoqueueModel = staffmemoqueueResultList[0];
                this.clearDisabled = false;
                this.tableIndex = 0;
                this.assignFlagDisable = false;
                this.disabled = false;
            }
        });
    }

    savestaffWorkForm() {
        this.staffmemoqueueUpdatetList = [];
        this.staffmemoqueueCommitModel.insertList = [];
        this.staffmemoqueueCommitModel.updateList = [];
        this.staffmemoqueueCommitModel.deleteList = [];
        if (this.workAssignData.length > 0) {
            for (let i = 0; i < this.workAssignData.length; i++) {
                if (this.workAssignData[i].assignedFlag && this.assignctrlModel.assignOtherTeam &&
                    (!this.assignctrlModel.assignedTeamId)) {
                    this.type = 'info';
                    this.message = this.translateService.translate('ocdtwork.youmustspecifytheteamyouwanttoassignto');
                    this.show();
                    return;
                } else if (this.workAssignData[i].assignedFlag && (!this.assignctrlModel.assignOtherTeam)) {
                    if (this.teammembersData.length > 0) {
                        const cont = { valid: true };
                        this.teammembersData.forEach(data => {
                            if (data.assignFlag) {
                                this.workAssignData[i].teamMemberId = data.teamMemberId;
                                this.staffmemoqueueUpdatetList.push(this.workAssignData[i]);
                                cont.valid = false;
                                return;
                            }
                        });
                        if (cont.valid) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocdtwork.noofficershavebeenselectedforassignment');
                            this.show();
                            return;
                        }
                    }
                } else if (this.workAssignData[i].completeFlag) {
                    this.staffmemoqueueUpdatetList.push(this.workAssignData[i]);
                } else if (this.workAssignData[i].assignedFlag && this.assignctrlModel.assignOtherTeam && this.assignedTeamDescription) {
                    this.workAssignData[i].assignedTeamId = this.assignctrlModel.assignedTeamId;
                    this.staffmemoqueueUpdatetList.push(this.workAssignData[i]);
                } else if(this.workAssignData[i].assignedFlag) {
                    this.staffmemoqueueUpdatetList.push(this.workAssignData[i]);
                }
            }
            this.staffmemoqueueCommitModel.updateList = this.staffmemoqueueUpdatetList;
        }
        if (this.staffmemoqueueDeleteList.length > 0) {
            for (let i = 0; i < this.staffmemoqueueDeleteList.length; i++) {
            }
        }
        const staffmemoqueueSaveData = this.ocdtworkFactory.staffMemoQueueCommit(this.staffmemoqueueCommitModel);
        staffmemoqueueSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                if (this.assignctrlModel.assignOtherTeam) {
                    this.btnClick();
                }
                this.assignedTeamDescription = undefined;
                this.assignctrlModel.assignOtherTeam = undefined;
                this.saveDisabled = true;
                this.validateStaffQueueFalg = false;
                this.validateStaffMemoQueueFlag = false;
                this.staffqueueExecuteQuery();
                this.staffmemoqueueExecuteQuery();
                this.teammembersExecuteQuery();
                this.show();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.validateStaffQueueFalg = false;
                this.validateStaffMemoQueueFlag = false;
                this.staffqueueExecuteQuery();
                this.staffmemoqueueExecuteQuery();
                this.teammembersExecuteQuery();
                this.show();
                return;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdtworkSavestaffmemoqueueForm(event) {
        this.staffmemoqueueUpdatetList = [];
        this.staffmemoqueueCommitModel.insertList = [];
        this.staffmemoqueueCommitModel.updateList = [];
        this.staffmemoqueueCommitModel.deleteList = [];
        if (event.updated.length > 0) {
            for (let i = 0; i < event.updated.length; i++) {
                if (event.updated[i].assignedFlag && this.assignctrlModel.assignOtherTeam && (!this.assignctrlModel.assignedTeamId)) {
                    this.type = 'info';
                    this.message = this.translateService.translate('ocdtwork.youmustspecifytheteamyouwanttoassignto');
                    this.show();
                    return;
                } else if (event.updated[i].assignedFlag && (!this.assignctrlModel.assignOtherTeam)) {
                    if (this.teammembersData.length > 0) {
                        const cont = { valid: true };
                        this.teammembersData.forEach(data => {
                            if (data.assignFlag) {
                                event.updated[i].teamMemberId = data.teamMemberId;
                                this.staffmemoqueueUpdatetList.push(event.updated[i]);
                                cont.valid = false;
                                return;
                            }
                            if (cont.valid) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('ocdtwork.noofficershavebeenselectedforassignment');
                                this.show();
                            }
                        });
                    }
                } else if (event.updated[i].completeFlag) {
                    this.staffmemoqueueUpdatetList.push(event.updated[i]);
                } else if (event.updated[i].assignedFlag && this.assignctrlModel.assignOtherTeam && this.assignedTeamDescription) {
                    event.updated[i].assignedTeamId = this.assignctrlModel.assignedTeamId;
                    this.staffmemoqueueUpdatetList.push(event.updated[i]);
                } else {
                    this.staffmemoqueueUpdatetList.push(event.updated[i]);
                }
            }
            this.staffmemoqueueCommitModel.updateList = this.staffmemoqueueUpdatetList;
        }
        if (this.staffmemoqueueDeleteList.length > 0) {
            for (let i = 0; i < this.staffmemoqueueDeleteList.length; i++) {
            }
        }
        const staffmemoqueueSaveData = this.ocdtworkFactory.staffMemoQueueCommit(this.staffmemoqueueCommitModel);
        staffmemoqueueSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.staffqueueExecuteQuery();
                this.staffmemoqueueExecuteQuery();
                this.show();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.staffqueueExecuteQuery();
                this.staffmemoqueueExecuteQuery();
                return;
            }
        });
    }

    teammembersExecuteQuery() {
        const teammembersResult = this.ocdtworkFactory.teamMembersExecuteQuery(this.teammembersModel);
        teammembersResult.subscribe(teammembersResultList => {
            if (teammembersResultList.length === 0) {
                this.teammembersData = [];
                this.teamFlag = false;
            } else {
                this.teammembersData = teammembersResultList;
                this.teammembersModel = teammembersResultList[0];
                this.teamFlag = true;
                this.tableIndex = 0;
            }
        });
    }

    staffAgylocChangeEvent(event) {
        if (event) {
            this.teamctrlModel.firstName = null;
            this.teamctrlModel.lastName = null;
            this.staffqueueModel = new TagWorkflowBrowseQueue();
            this.staffmemoqueueModel = new TagWorkflowBrowseQueue();
            this.lovReadOnly = false;
        }

    }

    staffLastNameChangeEvent(event) {
        this.staffqueueData = [];
        this.staffmemoqueueData = [];
        this.teammembersData = [];
        this.teamFlag = false;
        this.validateStaffQueueFalg = false;
        this.validateStaffMemoQueueFlag = false;
        if (event) {
            this.teammembersModel = this.teamctrlModel;
            this.teamctrlModel.firstName = event.firstName;
            this.teamctrlModel.lastName = event.lastName;
            this.teamctrlModel.staffId = Number(event.staffId);
            this.workAssignData = [];
            this.staffqueueExecuteQuery();
            this.teammembersExecuteQuery();
            this.staffmemoqueueExecuteQuery();
        }
    }
    memovalueChangeEvent = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'completeFlag' && event.data.completeFlag === true) {
            if (event.data.completeFlag === 'N') {
                this.grid.setColumnData('completeFlag', rowIndex, false);
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
                this.show();
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateStaffQueue = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.validateStaffQueueFalg = false;
        this.assignFlagDisable = true;
        this.disabled = true;
        this.saveDisabled = true;
        this.checkboxHide = true;
        this.checkboxOneHide = true;
        for (let i = 0; i < this.staffqueueData.length; i++) {
            if (this.staffqueueData[i].assignedFlag) {
                this.assignFlagDisable = false;
                this.disabled = false;
                this.saveDisabled = false;
                this.validateStaffQueueFalg = true;
                this.checkboxHide = false;
                this.checkboxOneHide = false;
            }
        }
        if (event.field === 'completeFlag' && event.data.completeFlag === true && event.data.workflowType === 'TASK') {
            if (event.data.manualCloseFlag === 'Y' && !event.data.assignedFlag) {
                this.dialogService.openLinkDialog('/ocdaworkdailog', this.staffqueueModel, 50).subscribe(result => {
                    this.staffqueueExecuteQuery();
                    this.staffmemoqueueExecuteQuery();
                    this.teammembersExecuteQuery();
                    if (result) {
                    } else {
                        this.grid.setColumnData('completeFlag', rowIndex, false);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            } else {
                event.data.completeFlag = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        }
        if (event.field === 'completeFlag' && event.data.completeFlag === true &&
            event.data.workflowType === 'MEMO' && event.data.manualCloseFlag === 'N') {
            event.data.completeFlag = 'N';
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
            this.show();
            rowdata.validated = false;
            return rowdata;
        }
        if (event.field === 'assignedFlag' && event.newValue !== event.oldValue) {
            this.checkTaskCount = 0;
            if (event.data.completeFlag === true) {
                this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
            if (this.teammembersData.length > 0) {
                for (let i = 0; i < this.teammembersData.length; i++) {
                    if (this.teammembersData[i].assignFlag) {
                        this.checkTaskCount = this.checkTaskCount + 1;
                    }
                }
            }
            if (this.checkTaskCount > 1) {
                rowdata.validated = true;
                this.type = 'warn';
                this.message = this.translateService.translate('ocdtwork.ataskcanonlybeassignedtoofficer');
                this.show();
                rowdata.data = { assignedFlag: false };
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateStaffMemoQueue = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.validateStaffMemoQueueFlag = false;
        this.assignFlagDisable = true;
        this.disabled = true;
        this.saveDisabled = true;
        this.checkboxHide = true;
        this.checkboxOneHide = true;
        for (let i = 0; i < this.staffmemoqueueData.length; i++) {
            if (this.staffmemoqueueData[i].assignedFlag) {
                this.checkboxHide = false;
                this.checkboxOneHide = false;
                this.validateStaffMemoQueueFlag = true;
                this.assignFlagDisable = false;
                this.disabled = false;
                this.saveDisabled = false;
            }
        }
        if (event.field === 'assignedFlag' && event.data.assignedFlag) {
        }
        if (event.field === 'completeFlag' && event.data.completeFlag === true && event.data.workflowType === 'TASK') {
            if (event.data.manualCloseFlag === 'Y') {
                this.dialogService.openLinkDialog('/ocdaworkdailog', this.staffqueueModel, 50).subscribe(result => {
                    this.staffqueueExecuteQuery();
                    this.staffmemoqueueExecuteQuery();
                    this.teammembersExecuteQuery();
                    if (result) {
                    } else {
                        this.grid.setColumnData('completeFlag', rowIndex, false);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
                this.show();
                rowdata.validated = false;
                return rowdata;
            }
        }
        if (event.field === 'completeFlag' && this.staffqueueModel.completeFlag === true &&
            event.data.workflowType === 'MEMO' && event.data.manualCloseFlag === 'N') {
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
            this.show();
            rowdata.validated = false;
            return rowdata;
    }
    if (event.field === 'completeFlag') {
        if (event.data.completeFlag) {
            this.saveDisabled = false;
        } else {
            this.saveDisabled = true;
        }
    }
        rowdata.validated = true;
        return rowdata;
    }

    validateTeamMembers = (event) => {
        const rowdata = new ValidateRowReturn();
        if (this.teamFlag === true) {

        }

        if (event.field === 'assignFlag' && event.newValue !== event.oldValue) {
            this.checkTaskCountOne = 0;
            for (let i = 0; i < this.teammembersData.length; i++) {
                if (this.teammembersData[i].assignFlag) {
                    this.checkTaskCountOne = this.checkTaskCountOne + 1;
                }
            }
            if (this.checkTaskCountOne > 0) {
                this.assignFlagDisable = true;
                this.assignctrlModel.assignOtherTeam = false;
                this.disabled = true;
                this.assignedTeamDescription = undefined;
            } else if (this.checkTaskCountOne === 0) {
                this.assignFlagDisable = false;
                this.disabled = false;
            }
            if (this.staffqueueModel && this.staffqueueModel.assignedFlag && this.staffqueueModel.workflowType === 'TASK') {
                this.checkTaskCount = 0;
                for (let i = 0; i < this.teammembersData.length; i++) {
                    if (this.teammembersData[i].assignFlag) {
                        this.checkTaskCount = this.checkTaskCount + 1;
                        this.assignFlagDisable = true;
                        this.disabled = true;
                    }
                }
                if (this.checkTaskCount > 0) {
                    this.assignFlagDisable = true;
                    this.disabled = true;
                } else if (this.checkTaskCount === 0) {
                    this.assignFlagDisable = false;
                    this.disabled = false;
                }
                if (this.checkTaskCount > 1) {
                    rowdata.validated = false;
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdtwork.ataskcanonlybeassignedtoofficer');
                    this.show();
                    return rowdata;
                }
            }
            if (this.staffmemoqueueModel && this.staffmemoqueueModel.assignedFlag && this.staffmemoqueueModel.workflowType === 'MEMO') {
                this.checkMemoCount = 0;
                for (let i = 0; i < this.teammembersData.length; i++) {
                    if (this.teammembersData[i].assignFlag) {
                        this.checkMemoCount = this.checkMemoCount + 1;
                    }
                }
                if (this.checkMemoCount > 0) {
                    this.assignFlagDisable = true;
                    this.disabled = true;
                } else if (this.checkMemoCount === 0) {
                    this.assignFlagDisable = false;
                    this.disabled = false;
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    onTeamLaunchClick = () => {
        if (this.assignctrlModel.assignOtherTeam) {
            return true;
        } else {
            return false;
        }
    }

    setTeamId(event) {
        if (event) {
            this.assignedTeamIdValue = event.teamId;
            this.assignctrlModel.assignedTeamId = event.teamId;
            this.assignedTeamDescription = event.teamIdDesc;
        } else {
            this.assignedTeamIdValue = undefined;
            this.assignedTeamDescription = undefined;
        }
    }
    assignOtherTeamCheckEvent(event) {
        if (!event.checked) {
            this.assignctrlModel.assignedTeamId = undefined;
            this.assignedTeamIdValue = undefined;
            this.assignedTeamDescription = undefined;
        }
        this.btnClick();

    }

    selectallworkEvent(event) {
        if (this.staffqueueData.length > 0) {
            const staffqueue = this.staffqueueData;
            if (event) {
                for (let i = 0; i < staffqueue.length; i++) {
                    this.grid.setColumnData('assignedFlag', i, event.checked);
                }
            }
            this.staffqueueData = staffqueue;
        }
        if (this.staffmemoqueueData.length > 0) {
            const staffmemo = this.staffmemoqueueData;
            if (event) {
                for (let i = 0; i < staffmemo.length; i++) {
                    this.gridMemo.setColumnData('assignedFlag', i, event.checked);
                }
            }
            this.staffmemoqueueData = staffmemo;
        }
    }

    /**
     * This function displays the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    onExitBtnClick = () => {
        if (this.ocdmworkFactory.exitFlag) {
            this.ocdmworkFactory.exitFlag = false;
            this.router.navigate(['/OCDMWORK']);
        }
        return true;
    }
    ngOnDestroy(): void {
        this.ocdmworkFactory.exitFlag = false;
    }
    btnClick(): void {
        const columns = this.dataGrid.columnApi.getAllColumns();
        const valueColumn = columns.filter(column => column.getColDef().headerName === 'Assign')[0];
        const newState = !valueColumn.isVisible();
        this.dataGrid.columnApi.setColumnVisible(valueColumn, newState);
        this.dataGrid.api.sizeColumnsToFit();
    }

}

