import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdaworkService } from '../service/ocdawork.service';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { TeamMembers } from '@cm/teams-workflow/beans/TeamMembers';
import { TagWorkflowBrowseQueueCommitBean } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueueCommitBean';
import { TeamMembersCommitBean } from '@cm/teams-workflow/beans/TeamMembersCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
//   import required bean declarations

@Component({
    selector: 'app-ocdawork',
    templateUrl: './ocdawork.component.html'
})

export class OcdaworkComponent implements OnInit {
    //   Variable declaration
    @ViewChild('grid') grid: any;
    @ViewChild('teamgrid') teamgrid: any;
    msgs: any[] = [];
    workAssignData: TagWorkflowBrowseQueue[] = [];
    teamqueueData: TagWorkflowBrowseQueue[] = [];
    teamqueueDataTemp: TagWorkflowBrowseQueue[] = [];
    teamqueueModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    taskModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    assigneTeamModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    teamqueueModelTemp: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    teamqueueIndex = 0;
    teamqueueInsertList: TagWorkflowBrowseQueue[] = [];
    teamqueueUpdateList: TagWorkflowBrowseQueue[] = [];
    teamqueueDeleteList: TagWorkflowBrowseQueue[] = [];
    teammembersData: TeamMembers[] = [];
    teammembersDataTemp: TeamMembers[] = [];
    teammembersModel: TeamMembers = new TeamMembers();
    teammembersRowData: TeamMembers = new TeamMembers();
    teammembersIndex = 0;
    teammembersInsertList: TeamMembers[] = [];
    teammembersUpdateList: TeamMembers[] = [];
    teammembersDeleteList: TeamMembers[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    disabled: boolean;
    editable = true;
    teamQueueColumnDef: any[];
    teamMembersColumnDef: any[];
    // rgreasonRg: any[] = [];
    // rgsexRg: any[] = [];
    // rgworktypeRg: any[] = [];
    // rgworksubtypeRg: any[] = [];
    // rgworkflowtypeRg: any[] = [];
    // rgpositionRg: any[] = [];
    // rgroleRg: any[] = [];
    rgteamstaffRg: any[] = [];
    // rgteammembersRg: any[] = [];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    teamqueueCommitModel: TagWorkflowBrowseQueueCommitBean = new TagWorkflowBrowseQueueCommitBean();
    teammembersCommitModel: TeamMembersCommitBean = new TeamMembersCommitBean();
    teamCode: any;
    assigneTeamCode: any;
    teamStaffMap: Map<string, string> = new Map<string, string>();
    assigneeTeamStaffMap: Map<string, string> = new Map<string, string>();
    selectedRow: number;
    selectedIndex: number;
    assignOtherTeam: boolean;
    assignFlagDisable: boolean;
    assignedTeamIdValue: number;
    assignedTeamDescription: string;
    teammemberId: number;
    checkFlag: boolean;
    teamqueueTempUpdateList: TagWorkflowBrowseQueue[] = [];
    teamTitles = { 'code': 'Team Code', 'description': 'Name' };
    saveDisabled: boolean;
    clearDisabled: boolean;
    allWorkCb: boolean;
    checkTaskCount: number;
    count: number;
    label: string;
    placeholder = 'Search tasks';
    teamMembersTitles = { description: 'Last Name', firstName: 'First Name', code: 'Staff Id' };
    disableRetrieve: boolean;
    constructor(private ocdaworkFactory: OcdaworkService,
        public translateService: TranslateService,
        public dialogService: DialogService,
        public sessionManager: UserSessionManager) {
        this.teamQueueColumnDef = [];
        this.teamMembersColumnDef = [];
    }
    ngOnInit() {
        this.checkFlag = false;
        this.teammemberId = undefined;
        this.assignedTeamDescription = undefined;
        this.assignedTeamIdValue = undefined;
        this.selectedRow = 0;
        this.saveDisabled = true;
        this.clearDisabled = true;
        this.selectedIndex = 0;
        this.teamCode = undefined;
        this.assignFlagDisable = true;
        this.disabled = true;

        this.teamQueueColumnDef = [
            {
                fieldName: this.translateService.translate('common.assign'), field: 'assignedFlag', editable: true, width: 150,
                datatype: 'checkbox',
                cellEditable: this.canFlagsEdit
            },
            {
                fieldName: this.translateService.translate('common.worktype'), field: 'workType', editable: false, width: 150,
                
            },
            
            
            { fieldName: this.translateService.translate('common.offendername'), field: 'offenderName', editable: false, width: 180 },
           /*  {
                fieldName: this.translateService.translate('system-profile.name-given-1'),
                field: 'firstName', editable: false, width: 180
            }, */
            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
           
            { fieldName: this.translateService.translate('common.detail'), field: 'messageText', editable: false, width: 150 },
            /* {
                fieldName: this.translateService.translate('ocdawork.workdate'), field: 'assignmentDate', editable: false,
                width: 150, datatype: 'date'
            }, */
            {
                fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.complete'), field: 'completeFlag', editable: true, width: 150,
                datatype: 'checkbox',
                cellEditable: this.canFlagsEdit
            },
        ];
        this.teamMembersColumnDef = [
            {
                fieldName: this.translateService.translate('common.assign'), field: 'assignFlag', editable: true, width: 150,
                datatype: 'checkbox',
                cellEditable: this.canCellEdit
            },
            { fieldName: this.translateService.translate('common.officername'), field: 'lastName', editable: false, width: 200 },
            { fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.position'), field: 'position', editable: false, width: 200,
                datatype: 'lov', domain: 'STAFF_POS'
            },
            {
                fieldName: this.translateService.translate('common.role'), field: 'role', editable: false, width: 230,
                datatype: 'lov', domain: 'STAFF_ROLE'
            },
            {
                fieldName: this.translateService.translate('common.gender'), field: 'gender', editable: false, width: 150,
                datatype: 'lov', domain: 'SEX'
            },
            { fieldName: this.translateService.translate('ocdawork.workload'), field: 'noOfTasks', editable: false, width: 150 },
        ];

        this.onButTaskHistclick();
    }
    /**
     *  This function will be executed when we click on the grid row in pending assignment block
     */
    onRowClickteamqueue(event) {
        if (event) {
            this.taskModel = event;
        } else {
            this.taskModel = new TagWorkflowBrowseQueue();
        }
    }
    /**
     *  This function will be executed when we change the grid row data columns in pending assignment block
     */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        for (let i = 0; i < this.teammembersData.length; i++) {
            if (this.teammembersData[i].assignFlag && i !== index && this.teamqueueModel.workflowType === 'TASK') {
                this.type = 'info';
                this.message = this.translateService.translate('ocdawork.ataskcanonlybeassigned');
                this.show();
                return false;
            }

        }
        if (this.teamqueueModelTemp.assignOtherTeam) {
            return false;
        } else {
            return true;
        }

    }
    /**
    *  This function will be executed when we change the grid row data columns in pending assignment block
    */
    canFlagsEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'assignedFlag' && data.completeFlag) {
            return false;
        }
        if (field === 'completeFlag' && data.assignedFlag) {
            return false;
        }
        if (field === 'completeFlag' && data.manualCloseFlag === 'N') {
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
            this.show();
            return false;
        }
        if (field === 'completeFlag' && data.completeFlag && data.workflowType === 'TASK') {
            if (data.manualCloseFlag === 'Y') {
                this.dialogService.openLinkDialog('/ocdaworkdailog', this.teamqueueModel, 50).subscribe(result => {
                    if (result) {
                    } else {
                        this.grid.setColumnData('completeFlag', this.teamqueueData.indexOf(data), false);
                        return true;
                    }
                });
            }
        }
        return true;
    }
    assigneAgencyChange(event) {
        if (event) {

            const rgteamstaffServiceObj = this.ocdaworkFactory.
                rgTeamStaffRecordGroup(this.teamqueueModel.agyLocId);
            rgteamstaffServiceObj.subscribe(rgteamstaffList => {
                if (rgteamstaffList.length === 0) {
                    this.rgteamstaffRg = [];
                } else {
                    for (let i = 0; i < rgteamstaffList.length; i++) {
                        this.rgteamstaffRg.push({
                            'text': rgteamstaffList[i].code + ' - ' +
                                rgteamstaffList[i].description, 'id': rgteamstaffList[i].code
                        });
                        this.assigneeTeamStaffMap.set(rgteamstaffList[i].code, rgteamstaffList[i].teamId);
                    }
                }
            });

        }
    }
    staffAgylocChangeEvent(event) {
        if (event) {

            const rgteamstaffServiceObj = this.ocdaworkFactory.
                rgTeamStaffRecordGroup(this.teamqueueModel.agyLocId);
            rgteamstaffServiceObj.subscribe(rgteamstaffList => {
                if (rgteamstaffList.length === 0) {
                    this.rgteamstaffRg = [];
                } else {
                    for (let i = 0; i < rgteamstaffList.length; i++) {
                        this.rgteamstaffRg.push({
                            'text': rgteamstaffList[i].code + ' - ' +
                                rgteamstaffList[i].description, 'id': rgteamstaffList[i].code
                        });
                        this.teamStaffMap.set(rgteamstaffList[i].code, rgteamstaffList[i].teamId);
                    }
                }
            });

        }
    }
    staffLastNameChangeEvent(event) {
        if (event) {
            this.teamqueueModel.staffId = event.staffId;
            if (event.userId) {
                this.teamqueueModel.userId = event.userId;
            }


        }
    }
    assigneStaffChange(event) {
        if (event) {
            this.assigneTeamModel.staffId = event.staffId;
            if (event.userId) {
                this.assigneTeamModel.userId = event.userId;
            }
        }
    }
    /**
     *  This function will be executed when we Close the dilog window
     */
    setTeamId(event) {
        if (event) {
            this.assignedTeamIdValue = event.teamId;
            this.teamqueueModelTemp.assignedTeamId = event.teamId;
            this.teamqueueModelTemp.assignedTeamCode = event.teamCode;
            this.assignedTeamDescription = event.teamIdDesc;
        } else {
            this.assignedTeamIdValue = undefined;
            this.assignedTeamDescription = undefined;
        }
    }

    assigneeTeamChange(event) {

        if (event) {
            this.assigneTeamModel.teamId = Number(this.assigneeTeamStaffMap.get(event.code));
            this.assigneTeamModel.teamCode = event.code;

        }
    }
    /**
      *  This function will be executed when we change the Team value in Teams block
      */
    teamValueChangeEvent(event) {
        const rowIndex = event.rowIndex;
        this.checkFlag = false;
        this.assignFlagDisable = false;
        this.disabled = false;
        if (event && event.code) {
            for (let i = 0; i < this.teamqueueData.length; i++) {
                if (this.teamqueueData[i].completeFlag || this.teamqueueData[i].assignedFlag) {
                    this.checkFlag = true;
                }
            }
            if (this.checkFlag) {
                const data = {
                    label: this.translateService.translate('common.doyouwanttosavechanges'), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                    this.teamStaffMap.get(event.code);
                    this.teammembersModel = new TeamMembers();
                    this.teamqueueModel = new TagWorkflowBrowseQueue();
                    this.teammembersModel.teamId = Number(this.teamStaffMap.get(event.code));
                    this.teamqueueModel.teamId = Number(this.teamStaffMap.get(event.code));
                    this.teamqueueModel.teamCode = event.code;
                    //this.teammembersExecuteQuery();
                    this.teamqueueExecuteQuery();
                    this.teamqueueModelTemp = new TagWorkflowBrowseQueue();
                    this.assignedTeamDescription = undefined;
                });
            } else {
                this.teamStaffMap.get(event.code);
                this.teammembersModel = new TeamMembers();
                //this.teamqueueModel = new TagWorkflowBrowseQueue();
                this.teammembersModel.teamId = Number(this.teamStaffMap.get(event.code));
                this.teamqueueModel.teamCode = event.code;
                this.teamqueueModel.teamId = Number(this.teamStaffMap.get(event.code));
                //this.teammembersExecuteQuery();
                //this.teamqueueExecuteQuery();
                this.teamqueueModelTemp = new TagWorkflowBrowseQueue();
                this.assignedTeamDescription = undefined;
            }
        }
    }

    onClear() {
        this.teamCode = '';
        this.assigneTeamCode = '';
        this.allWorkCb = false;
        this.workAssignData = [];
        this.teamqueueData = [];
        this.teammembersData = [];
        this.teamqueueModel = new TagWorkflowBrowseQueue();
        this.teamqueueModelTemp = new TagWorkflowBrowseQueue();
        this.saveDisabled = true;
        this.clearDisabled = true;
        this.assigneTeamModel = new TagWorkflowBrowseQueue();
        this.disableRetrieve = false;
        this.assignedTeamDescription = undefined;
    }

    /*
    * this event is used to do the validations when we enter the value in Work Detail field
    */
    onKeyPressEvent() {
        this.type = 'info';
        this.message = this.translateService.translate('common.fieldisprotectedagainstupdate');
        this.show();
    }
    /**
      *  This function will be executed when we click in select all check box
      */
    selectallworkEvent(event) {
        if (!event.checked) {
            this.teamqueueModelTemp = new TagWorkflowBrowseQueue();
            this.assignedTeamDescription = undefined;
        }
        if (this.teamqueueData.length > 0) {
            const teamqueue = this.teamqueueData;
            if (event) {
                for (let i = 0; i < teamqueue.length; i++) {
                    this.grid.setColumnData('assignedFlag', i, event.checked);
                }
            }
            this.teamqueueData = teamqueue;
        }
    }
    /**
     *  This function will be executed to display messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }


    onButTaskHistclick() {
        if (this.sessionManager.currentCaseLoadType === 'COMM') {
            this.label = this.translateService.translate('system-profile.comm-agency');
        } else {
            this.label = this.translateService.translate('system-profile.inst-agency');
        }
    }
    /**
     *  This function will be executed to retrieve the Pending assignment Block data
     */
    teamqueueExecuteQuery() {
        this.workAssignData = [];
        this.teamqueueModel.teamCode = this.teamCode;
        if (!this.teamqueueModel.agyLocId) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdawork.agylocidmust');
            this.show();
            return;
        }
        if (!this.teamqueueModel.teamCode) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdawork.teammust');
            this.show();
            return;
        }

        const teamqueueResult = this.ocdaworkFactory.
            teamQueueExecuteQuery(this.teamqueueModel);
        teamqueueResult.subscribe(teamqueueResultList => {
            if (teamqueueResultList.length === 0) {
                this.teamqueueData = [];
                this.type = 'info';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.disableRetrieve = false;
                this.clearDisabled = true;
            } else {
                this.selectedRow = 0;
                teamqueueResultList.forEach(element => {
                    element.eventDate = DateFormat.getDate(element.eventDate);
                    element.assignmentDate = DateFormat.getDate(element.eventDate);
                    element.dueDate = DateFormat.getDate(element.dueDate);
                    element.teamId = this.teamqueueModel.teamId;
                    if(element.lastName && element.firstName){
                        element.offenderName=element.lastName+','+element.firstName;
                    }
                    this.workAssignData.push(element);
                });
                this.teamqueueData = teamqueueResultList;
                this.taskModel = teamqueueResultList[0];
                this.clearDisabled = false;
                this.disableRetrieve = true;
            }
        });
    }

    saveValidation() {
        if (!this.assigneTeamModel.agyLocId) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdawork.agylocidmust');
            this.show();
            return false;;
        }
        if (!this.assigneTeamModel.teamCode) {
            this.type = 'info';
            this.message = this.translateService.translate('ocdawork.teammust');
            this.show();
            return false;
        }
        return true;
    }

    get readeOnlyFields() {
        if (this.teamqueueData.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    get assignedFields() {
        if (this.teamqueueData.length === 0) {
            return true;
        } else {
            return false;
        }

    }

    get clearFlag(): boolean {
        if (this.teamqueueData.length > 0 || this.teamqueueModel.agyLocId ||
            this.teamqueueModel.teamCode || this.teamqueueModel.userId) {
            return false;
        } else {
            return true;
        }
    }
    /**
     *  This function will be executed when we save the pending assignment grid data
    */
    ocdaworkSaveteamqueueForm() {

        if (!this.saveValidation()) {
            return;
        }
        this.teamqueueInsertList = [];
        this.teamqueueUpdateList = [];
        this.teamqueueDeleteList = [];
        // this.teamqueueInsertList = event.added;
        for (let i = 0; i < this.workAssignData.length; i++) {
            if (this.workAssignData[i].assignedFlag) {
                if (this.teamqueueModel.teamCode && this.teamqueueModel.staffId && this.teamqueueModel.staffId !== 0 && this.assigneTeamModel.teamCode && this.assigneTeamModel.staffId && this.assigneTeamModel.staffId !== 0) {
                    this.workAssignData[i].assignToOtherUser = true;
                    this.workAssignData[i].assignedTeamId = this.assigneTeamModel.teamId
                    this.workAssignData[i].assignedTeamCode = this.assigneTeamModel.teamCode;
                    this.workAssignData[i].assigneeOtherUser = this.assigneTeamModel.userId;
                } else if (this.teamqueueModel.teamCode && this.teamqueueModel.staffId && this.teamqueueModel.staffId !== 0 && this.assigneTeamModel.teamCode) {
                    this.workAssignData[i].assignFromUserToTeam = true;
                    this.workAssignData[i].assignedTeamCode = this.assigneTeamModel.teamCode;
                    this.workAssignData[i].assignedTeamId = this.assigneTeamModel.teamId;
                } else if (this.teamqueueModel.teamCode && this.assigneTeamModel.staffId && this.assigneTeamModel.staffId !== 0 && this.assigneTeamModel.teamCode) {
                    this.workAssignData[i].assignToUser = true;
                    this.workAssignData[i].assignedTeamId = this.assigneTeamModel.teamId
                    this.workAssignData[i].assignedTeamCode = this.assigneTeamModel.teamCode;
                    this.workAssignData[i].assignee = this.assigneTeamModel.userId;
                } else if (this.teamqueueModel.teamCode && this.assigneTeamModel.teamCode) {
                    this.workAssignData[i].assignOtherTeam = true;
                    this.workAssignData[i].assignedTeamId = this.assigneTeamModel.teamId
                    this.workAssignData[i].assignedTeamCode = this.assigneTeamModel.teamCode;
                }
                this.teamqueueUpdateList.push(this.workAssignData[i]);
            }

        }

        this.teamqueueCommitModel.insertList = [];
        this.teamqueueCommitModel.updateList = [];
        this.teamqueueCommitModel.deleteList = [];
        this.teamqueueCommitModel.updateList = this.teamqueueUpdateList;
        if (this.teamqueueCommitModel.updateList.length > 0) {
            const teamqueueSaveData = this.ocdaworkFactory.teamQueueCommit(this.teamqueueCommitModel);
            teamqueueSaveData.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    if (this.teamqueueModelTemp.assignOtherTeam) {
                        this.btnClick();
                    }
                    this.saveDisabled = true;
                    this.allWorkCb = false;
                    this.assigneTeamModel = new TagWorkflowBrowseQueue();
                    this.assignedTeamDescription = undefined;
                    this.teamqueueModelTemp.assignOtherTeam = undefined;
                    this.teamqueueExecuteQuery();
                    //  this.teammembersExecuteQuery();
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.teamqueueExecuteQuery();
                    // this.teammembersExecuteQuery();
                }
            });
        }
    }
    /**
     *  This function will be executedto retrieve the Assigned to associated officer Block data
     */
    teammembersExecuteQuery() {
        const teammembersResult = this.ocdaworkFactory.
            teamMembersExecuteQuery(this.teammembersModel);
        teammembersResult.subscribe(teammembersResultList => {
            if (teammembersResultList.length === 0) {
                this.teammembersData = [];
            } else {
                this.selectedIndex = 0;
                this.teammembersData = teammembersResultList;
                this.teammembersModel = teammembersResultList[0];
                this.clearDisabled = false;

            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdaworkSaveteammembersForm(event) {
        this.teammembersInsertList = event.added;
        this.teammembersUpdateList = event.updated;
        this.teammembersDeleteList = event.removed;
        this.teammembersCommitModel.insertList = [];
        this.teammembersCommitModel.updateList = [];
        this.teammembersCommitModel.deleteList = [];
        if (this.teammembersInsertList.length > 0 || this.teammembersUpdateList.length > 0) {
            for (let i = 0; i < this.teammembersInsertList.length; i++) {
            }
            for (let i = 0; i < this.teammembersUpdateList.length; i++) {
            }
        }
        if (this.teammembersDeleteList.length > 0) {
            for (let i = 0; i < this.teammembersDeleteList.length; i++) {
            }
        }
        const teammembersSaveData = this.ocdaworkFactory.teamMembersCommit(this.teammembersCommitModel);
        teammembersSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    assignToDiffTeamEvent(event) {
        if (!event.checked) {
            this.teamqueueModelTemp.assignedTeamId = undefined;
            this.assignedTeamIdValue = undefined;
            this.assignedTeamDescription = undefined;
        }
        this.btnClick();
    }
    btnClick(): void {
        if (this.teamgrid.columnApi) {
            const columns = this.teamgrid.columnApi.getAllColumns();
            const valueColumn = columns.filter(column => column.getColDef().headerName === 'Assign')[0];
            const newState = !valueColumn.isVisible();
            this.teamgrid.columnApi.setColumnVisible(valueColumn, newState);
            this.teamgrid.api.sizeColumnsToFit();
        }
    }

    onTeamLaunchClick = () => {
        if (this.teamqueueModelTemp.assignOtherTeam) {
            return true;
        } else {
            return false;
        }
    }
    valueChangeEvent = (event) => {
        const rowdata = new ValidateRowReturn();
        this.assignFlagDisable = true;
        this.disabled = true;
        this.saveDisabled = true;
        if (event.field === 'assignedFlag') {
            if (this.allWorkCb) {
                this.count = 0;
                this.teamqueueData.forEach(element => {
                    if (!element.assignedFlag) {
                        this.count = this.count + 1;
                    }
                });
                if (this.teamqueueData.length > this.count) {
                    this.allWorkCb = false;
                }
            }
            if (!this.allWorkCb) {
                this.count = 0;
                this.teamqueueData.forEach(element => {
                    if (element.assignedFlag) {
                        this.count = this.count + 1;
                    }
                });
                if (this.teamqueueData.length === this.count) {
                    this.allWorkCb = true;
                }
            }
            if (this.teamqueueData.length === 1 && !this.teamqueueData[0].assignedFlag!) {
                this.allWorkCb = false;
            }
        }
        for (let i = 0; i < this.teamqueueData.length; i++) {
            if (this.teamqueueData[i].assignedFlag) {
                this.assignFlagDisable = false;
                this.disabled = false;
                this.saveDisabled = false;
            }
        }
        if (!event.data.assignedFlag && event.field === 'completeFlag' && event.data.completeFlag === true &&
            event.data.workflowType === 'TASK') {
            if (event.data.manualCloseFlag === 'Y') {
                this.dialogService.openLinkDialog('/ocdaworkdailog', this.teamqueueModel, 50).subscribe(result => {
                    if (result) {
                        this.teamqueueExecuteQuery();
                    } else {
                        this.grid.setColumnData('completeFlag', this.teamqueueData.indexOf(event.data), false);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            } else {
                this.grid.setColumnData('completeFlag', this.teamqueueData.indexOf(event.data), false);
                this.type = 'warn';
                this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
                this.show();
            }
        }

        if (event.field === 'completeFlag' && event.data.completeFlag === true && event.data.workflowType === 'MEMO') {
            this.btnClick();
        }
        if (event.field === 'completeFlag' && event.data.completeFlag === false && event.data.workflowType === 'MEMO') {
            this.btnClick();
        }

        if (event.field === 'assignedFlag' && event.data.completeFlag === true) {
            this.grid.setColumnData('assignedFlag', this.teamqueueData.indexOf(event.data), false);
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
            this.show();
        }

        if (event.field === 'completeFlag' && event.data.assignedFlag === true) {
            this.grid.setColumnData('completeFlag', this.teamqueueData.indexOf(event.data), false);
            this.type = 'warn';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
            this.show();
        }

        if (event.field === 'completeFlag') {
            if (event.data.completeFlag && event.data.workflowType === 'MEMO') {
                this.saveDisabled = false;
            } else {
                this.saveDisabled = true;
            }
        }

        rowdata.validated = true;
        return rowdata;
    }
    onRowClickaAsociatedofficer(event) {
        if (event) {
            this.teammembersRowData = event;
        }
    }
    onSkillsButclick = () => {
        this.dialogService.openLinkDialog('/OUMSTAFC', this.teammembersRowData, 80).subscribe(result => {
        });
    }
    teamDataChangeEvent = (event) => {
        this.assignFlagDisable = false;
        this.disabled = false;
        const rowdata = new ValidateRowReturn();
        this.checkTaskCount = 0;
        for (let i = 0; i < this.teammembersData.length; i++) {
            if (this.teammembersData[i].assignFlag) {
                this.assignFlagDisable = true;
                this.disabled = true;
                this.checkTaskCount = this.checkTaskCount + 1;
            }
        }
        if (this.checkTaskCount > 0) {
            this.assignFlagDisable = true;
            this.teamqueueModelTemp.assignOtherTeam = false;
            this.disabled = true;
            this.assignedTeamDescription = undefined;
        } else if (this.checkTaskCount === 0) {
            this.assignFlagDisable = false;
            this.disabled = false;
        }
        if (this.checkTaskCount > 1) {
            rowdata.validated = false;
            this.type = 'warn';
            this.message = this.translateService.translate('ocdawork.error');
            this.show();
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }
}
