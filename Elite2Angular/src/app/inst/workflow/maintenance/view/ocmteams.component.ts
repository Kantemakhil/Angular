import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmteamsService } from '@inst/workflow/maintenance/service/ocmteams.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Teams } from '@instCaseManagementbeans/Teams';
import { TeamMembers } from '@cm/teams-workflow/beans/TeamMembers';
import { TeamFunctions } from '@inst/workflow/maintenance/beans/TeamFunctions';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { TeamsCommitBean } from '@inst/workflow/maintenance/beans/TeamsCommitBean';
import { TeamMembersCommitBean } from '@cm/teams-workflow/beans/TeamMembersCommitBean';
import { TeamFunctionsCommitBean } from '@inst/workflow/maintenance/beans/TeamFunctionsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';



@Component({
    selector: 'app-ocmteams',
    templateUrl: './ocmteams.component.html'

})

export class OcmteamsComponent implements OnInit {
    @ViewChild('teamsgrid') teamsgrid: any;
    @ViewChild('teamMembersgrid') teamMembersgrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    teamsData: Teams[] = [];
    teamsDataTemp: Teams[] = [];
    teamsModel: Teams = new Teams();
    teamsSearchModel: Teams = new Teams();
    teamsValidateModel: Teams = new Teams();
    teamsIndex: Number = 0;
    teamsInsertList: Teams[] = [];
    teamsUpdatetList: Teams[] = [];
    teamsDeleteList: Teams[] = [];
    teamfunctionsData: TeamFunctions[] = [];
    teamfunctionsDataTemp: TeamFunctions[] = [];
    teamfunctionsModel: TeamFunctions = new TeamFunctions();
    teamfunctionsValidationModel: TeamFunctions = new TeamFunctions();
    teamfunctionsIndex: Number = 0;
    teamfunctionsInsertList: TeamFunctions[] = [];
    teamfunctionsUpdatetList: TeamFunctions[] = [];
    teamfunctionsDeleteList: TeamFunctions[] = [];
    availteamData: Teams[] = [];
    availteamDataTemp: Teams[] = [];
    availteamModel: Teams = new Teams();
    availteamIndex: Number = 0;
    availteamInsertList: Teams[] = [];
    availteamUpdatetList: Teams[] = [];
    availteamDeleteList: Teams[] = [];
    teammembersData: TeamMembers[] = [];
    teammembersDataTemp: TeamMembers[] = [];
    teammembersModel: TeamMembers = new TeamMembers();
    teammembersValidateModel: TeamMembers = new TeamMembers();
    teammembersIndex: Number = 0;
    teammembersInsertList: TeamMembers[] = [];
    teammembersUpdatetList: TeamMembers[] = [];
    teammembersDeleteList: TeamMembers[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    teamsColumnDef: any[];
    availTeamColumnDef: any[];
    teamMembersColumnDef: any[];
    teamFunctionsColumnDef: any[];
    mainTeamReadOnly: Boolean = false;
    teamsReadOnly: Boolean = false;
    teamFunctionsReadOnly: Boolean = false;
    availTeamReadOnly: Boolean = false;
    teamMembersReadOnly: Boolean = false;
    rgteamareaRg: any[] = [];
    rgteamsteamcodeRg: any[] = [];
    rgteamsteamcategoryRg: any[] = [];
    rgteamsactiveflagRg: any[] = [];
    rgareatypeRg: any[] = [];
    rgfuctiontypeRg: any[] = [];
    rgavailteamteamcodeRg: any[] = [];
    rgpositionRg: any[] = [];
    rgroleRg: any[] = [];
    rgagylocidRg: any[] = [];
    rgadmagylocRg: any[] = [];
    teamsCommitModel: TeamsCommitBean = new TeamsCommitBean();
    teammembersCommitModel: TeamMembersCommitBean = new TeamMembersCommitBean();
    teamfunctionsCommitModel: TeamFunctionsCommitBean = new TeamFunctionsCommitBean();
    areaType: any;
    cellvalues: string;
    disableSubType: boolean;
    areaCode: any;
    adminLocationLink: any;
    agyLocIdMap: Map<string, string> = new Map<string, string>();
    rgstaffnamecommRg: any[] = [];
    clearDisabled: boolean;
    retriveDisabled: boolean;
    namesReadOnly: boolean;
    tableIndex: number;
    isLoading: boolean;
    teamMembersEnableGrid: boolean;
    enableFunctionGridDelete: boolean;
    enableFunctionGrid: boolean;
    enableTeamsGridDelete: boolean;
    updateAgyLocId: any;
    updateAllowedFlagTeams: boolean;
    updateFunctionServedGrid: boolean;
    type: string;
    message: string;
    selectedTabIndex: any;
    areaTypeTitles: { description: string; code: string; };
    enableTeamGridInsert: boolean;
    updateTeamGrid: boolean;
    enableTeamMembersGrid: boolean;
    namesReadOnlyArea: boolean;
    teamCodeExist: boolean;
    deleteFlag: boolean;
    deleteFlagTemp: any;
    agyLocTypeLink = 'ocmteams/rgAreaTypeRecordGroup';
    gridInsBtn: boolean;
    constructor(private ocmteamsFactory: OcmteamsService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService) {
        this.teamsColumnDef = [];
        this.availTeamColumnDef = [];
        this.teamMembersColumnDef = [];
        this.teamFunctionsColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.namesReadOnlyArea = true;
        this.teamMembersEnableGrid = false;
        this.enableFunctionGrid = false;
        this.enableFunctionGridDelete = false;
        this.updateAllowedFlagTeams = false;
        this.updateFunctionServedGrid = false;
        this.updateTeamGrid = true;
        this.enableTeamMembersGrid = true;
        this.adminLocationLink = '/ocmteams/rgAdmAgyLocRecordGroup?areaCode=';
        this.disableSubType = true;
        this.teamsSearchModel.agyLocType = '';
        this.gridInsBtn = false;
        this.areaTypeTitles = {
            description: this.translateService.translate('ocmteams.lovdescription'),
            code: this.translateService.translate('ocmteams.areatypelovcode')
        };
        this.teamsColumnDef = [
            {
                fieldName: this.translateService.translate('ocmteams.teamteamcode'), field: 'teamCode', editable: true,
                width: 150, cellEditable: this.canAlertEditTabSecReason, datatype: 'text', uppercase: true,
                maxlength: 20,
            },
            {
                fieldName: this.translateService.translate('ocmteams.teamname'), field: 'description', editable: true,
                width: 150, cellEditable: this.canAlertEditTabSecReason, datatype: 'text', uppercase: 'false', maxlength: 40
            },
            {
                fieldName: this.translateService.translate('ocmteams.category'), field: 'category',
                editable: true, width: 150, datatype: 'lov', domain: 'TEAMCATEGORY', cellEditable: this.canAlertEditTabSecReason,
                titles: {
                    description: this.translateService.translate('ocmteams.categorylov'),
                    code: this.translateService.translate('ocmteams.lovCode')
                }
            },
            {
                fieldName: this.translateService.translate('ocmteams.sequence'), field: 'listSeq', editable: true,
                width: 150, maxValue: '999999', strictFP: true, whole: true, datatype: 'number',
                cellEditable: this.canAlertEditTabSecReason
            },
            {
                fieldName: this.translateService.translate('ocmteams.adminlocation'), field: 'agyLocId', editable: true,
                width: 300, datatype: 'lov', link: this.adminLocationLink, cellEditable: this.canAlertEditTabSecReason,
                titles: {
                    description: this.translateService.translate('ocmteams.agencylocationlov')
                }
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', cellEditable: this.canActiveEdit,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
            { fieldName: '', field: 'description', editable: false, width: 10, hide: true }
        ];
        this.teamFunctionsColumnDef = [
            {
                fieldName: this.translateService.translate('ocmteams.funationaltype'), field: 'functionType', editable: true,
                width: 300, datatype: 'lov', link: 'ocmteams/rgFuctionTypeRecordGroup', cellEditable: this.canAlertEditFunction,
                titles: {
                    code: this.translateService.translate('ocmteams.lovCode'),
                    description: this.translateService.translate('ocmteams.lovdescription')
                }
            },
        ];
        this.availTeamColumnDef = [
            {
                fieldName: this.translateService.translate('ocmteams.availteamcode'), field: 'teamCode', editable: true,
                width: 200, cellEditable: this.canAlertEditTabSecReason, datatype: 'text', uppercase: true,
                maxlength: 20,
            },
            {
                fieldName: this.translateService.translate('ocmteams.availteamname'), field: 'description', editable: true,
                width: 300,
            },
            {
                fieldName: this.translateService.translate('ocmteams.availcategory'), field: 'category', editable: true,
                width: 300, datatype: 'lov', domain: 'TEAMCATEGORY'
            },

        ];
        this.teamMembersColumnDef = [
            { fieldName: this.translateService.translate('ocmteams.lastname'), field: 'lastName', editable: false, width: 150 },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', editable: true,
                width: 120, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick,
            },
            { fieldName: this.translateService.translate('ocmteams.firstname'), field: 'firstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocmteams.position'), field: 'position', editable: false,
                width: 150, datatype: 'lov', domain: 'STAFF_POS'
            },
            {
                fieldName: this.translateService.translate('ocmteams.role'), field: 'role', editable: false, width: 150,
                datatype: 'lov', domain: 'STAFF_ROLE'
            },
            {
                fieldName: this.translateService.translate('ocmteams.schedule'), field: 'scheduleType', editable: false,
                width: 150
            },
            { fieldName: this.translateService.translate('ocmteams.hours'), field: 'hoursPerWeek', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocmteams.agencylocation'), field: 'agyLocId', editable: false,
                width: 300, datatype: 'lov', link: this.adminLocationLink
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
            { fieldName: '', field: 'locRoleFromDate', editable: false, width: 10, hide: true, datatype: 'date' },
            { fieldName: '', field: 'staffId', editable: false, width: 10, hide: true }
        ];
        const cgfkAgylocidServiceObj = this.ocmteamsFactory.rgTeamsTeamCodeRecordGroup();
        cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList => {
            if (cgfkAgylocidList.length === 0) {
                this.rgstaffnamecommRg = [];
            } else {
                for (let i = 0; i < cgfkAgylocidList.length; i++) {
                    this.rgstaffnamecommRg.push({
                        'code': cgfkAgylocidList[i].code + ' - ' +
                            cgfkAgylocidList[i].description, 'id': cgfkAgylocidList[i].code
                    });
                    this.agyLocIdMap.set(cgfkAgylocidList[i].code, cgfkAgylocidList[i].description);
                }
            }
        });
    }
    whenTabChangedTrigger(event) {
        this.selectedTabIndex = event.index;
        if (this.selectedTabIndex === 1 && !this.teamsModel.activeFlag) {
            this.show(this.translateService.translate('ocmteams.inactiverecord'), 'warn');
        }
    }
    canAlertEditTabSecReason = (data: any, index: number, field: string): boolean => {
        if (data.updateDeleteAllowedCount === 0 && data.createDatetime) {
            return false;
        }
        if (((data.updateDeleteAllowedCount === 0 && data.createDatetime) || this.teammembersData.length > 0) && field === 'teamCode') {
            return false;
        } else {
            return true;
        }
    }
    canActiveEdit = (data: any, index: number, field: string): boolean => {
        if (data.updateDeleteAllowedCount === 0 &&  data.createDatetime){
            return false;
        }else{
            return true;
        }
    }
    canAlertEditFunction = (data: any, index: number, field: string): boolean => {
        if ((this.deleteFlagTemp && data.createDatetime)  || !data.createDatetime) {
            return true;
        }
            return false;
    }
    disableCell = (data: any, index: number): boolean => {
        if (!this.deleteFlagTemp && this.teammembersModel.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    /**
      * This function displays the messages
      */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickteams(event) {
        if (event) {
            this.teamsModel = event;
            this.teamsModel.areaCode = this.teamsSearchModel.areaCode;
            this.teamsModel.agyLocType = this.teamsSearchModel.agyLocType;
            this.availteamModel.areaCode = this.teamsSearchModel.areaCode;
            if (this.teamsModel.createDatetime) {
                this.enableTeamsGridDelete = true;
            } else {
                this.enableTeamsGridDelete = false;
            }
            if (this.teamsModel.agyLocId) {
                this.updateAllowedCheck();
            }
            if (this.teamsModel.teamId) {
                this.availteamData = Object.assign([], this.teamsModel);
                this.teamfunctionsModel.teamId = this.teamsModel.teamId;
                this.teammembersModel.teamId = this.teamsModel.teamId;
                this.availteamModel.teamId = this.teamsModel.teamId;
                this.teamsSearchModel.teamId = this.teamsModel.teamId;
                this.teamMembersExist();
                this.teamfunctionsExecuteQuery();
                if (this.teamsModel.activeFlag) {
                    this.ocmteamsAvailexecuteQuery();
                } else {
                    this.ocmteamAviailAllExecuteQuery();
                }
            } else {
                this.teamfunctionsModel = new TeamFunctions();
                this.teamfunctionsData = [];
                this.teammembersData = [];
            }
            if (this.teamsModel.createDatetime) {
                this.enableFunctionGrid = true;

            } else {
                this.enableFunctionGrid = false;
            }
        }
    }
    onRowClickteamfunctions(event) {
        if (event) {
            this.teamfunctionsModel = event;
            if (this.teamfunctionsModel.createDatetime) {
                if (this.deleteFlagTemp) {
                    this.enableFunctionGridDelete = true;
                } else {
                    this.enableFunctionGridDelete = false;
                }
            } else {
                this.enableFunctionGridDelete = false;
            }
        }
    }
    onRowClickavailteam(event) {
        if (event) {
            this.availteamModel = event;
            this.teammembersModel.teamId = this.availteamModel.teamId;
            if (this.availteamModel.teamId) {
                this.teamMembersEnableGrid = true;
            } else {
                this.teamMembersEnableGrid = false;
            }
            this.teammembersExecuteQuery();
        }
    }
    onRowClickteammembers(event) {
        if (event) {
            this.teammembersModel = event;
            this.teammembersModel.teamId = this.availteamModel.teamId;
            if (this.teammembersModel.createDatetime) {
                if (this.deleteFlagTemp) {
                    this.enableTeamMembersGrid = true;
                } else {
                    this.enableTeamMembersGrid = false;
                }
            } else {
                if (this.teammembersModel.staffId) {
                    this.enableTeamMembersGrid = true;
                } else {
                    this.enableTeamMembersGrid = false;
                }
            }
        }
    }
    isInsertable() {
        if (this.teamsSearchModel.agyLocType || this.teamsSearchModel.areaCode) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    clear() {
        this.teamsSearchModel = new Teams();
        this.teamsModel = new Teams();
        this.teamsData = [];
        this.teamfunctionsData = [];
        this.availteamData = [];
        this.teammembersData = [];
        this.areaCode = undefined;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.namesReadOnlyArea = true;
        this.enableTeamGridInsert = false;
        this.enableFunctionGrid = false;
        this.teamMembersEnableGrid = false;
        this.gridInsBtn = false;
    }
    sectionSlotlov() {
        const serviceObj = this.ocmteamsFactory.rgAdmAgyLocRecordGroup(this.teamsSearchModel.areaCode);
        serviceObj.subscribe(data => {
        });

    }
    adminAgyLocId() {
        const serviceObj = this.ocmteamsFactory.rgAdmAgyLocRecordGroup(this.teamsSearchModel.areaCode);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.updateAgyLocId = data[0].code;
                this.updateAllowedCheck();
            }
        });

    }
    updateAllowedCheck() {
        this.deleteFlagTemp = false;
        const serviceObj = this.ocmteamsFactory.updateAllowedCheck(this.sessionManager.currentCaseLoad, this.teamsModel.agyLocId,);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.deleteFlagTemp = true;
            } else {
                this.deleteFlagTemp = false;
            }
        });
    }

    agyLocAdmChangeEvent(event) {
        if (event && event.code) {
            this.teamsSearchModel.areaCode = event.code;
            this.teamsColumnDef[4].link = 'ocmteams/rgAdmAgyLocRecordGroup?areaCode=' + event.code;
            this.teamMembersColumnDef[7].link = 'ocmteams/rgAdmAgyLocRecordGroup?areaCode=' + event.code;
            this.teamsgrid.prepareAgColumnDef();
            this.teamsData = [];
            this.teamMembersgrid.prepareAgColumnDef();
            this.teammembersData = [];
            this.sectionSlotlov();
            this.adminAgyLocId();

        } else {
            //this.teamsSearchModel = new Teams();
            this.teamsData = [];
            this.teamfunctionsData = [];
            this.availteamData = [];
            this.teammembersData = [];

        }
    }
    onGridDeleteTeams = () => {
        if (this.deleteFlag) {
            this.show(this.translateService.translate('ocmteams.staffmemberexistvalid'), 'warn');
            return false;
        }
        if (this.teamfunctionsData.length > 0) {
            this.show(this.translateService.translate('ocmteams.teamsdeltefunctionvalid'), 'warn');
            return false;
        }
        if (!this.deleteFlagTemp) {
            this.show(this.translateService.translate('ocmteams.deleterecordvalidation'), 'warn');
            return false;
        }
        return true;
    }
    teamMembersExist() {
        this.deleteFlag = false;
        const serviceObj = this.ocmteamsFactory.availTeamOnCheckDeleteMaster(this.teamsSearchModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.deleteFlag = true;
            } else {
                this.deleteFlag = false;
            }
        });

    }
    onGridClearTeams = (event) => {
        this.teamCodeExist = false;
        this.ocmteamsexecuteQuery();
        return;
    }
    changeCellBlock(event) {
        if (event) {
            this.cellvalues = 'ocmteams/rgTeamAreaRecordGroup?areaType=' + this.teamsSearchModel.agyLocType;
            this.getSubTypeList();
        } else {
            this.areaType = undefined;
        }
    }

    getSubTypeList() {
        const getObjectData = this.ocmteamsFactory.rgTeamAreaRecordGroup(this.teamsSearchModel.agyLocType);
        getObjectData.subscribe(data => {
            if (data.length > 0) {
                this.namesReadOnlyArea = false;
            } else {
                this.namesReadOnlyArea = true;
            }
        });
    }
    teamMembersInsert = () => {
        return {
            button: '..', firstName: '', lastName: '', role: '', activeFlag: true, position: ''
        };

    }
    caGoBtnClick = (data) => {
        this.isLoading = true;
        if (this.teamsModel) {
            this.dialogService.openLinkDialog('/OCUCSTAF', this.teamsModel, 80).subscribe(res => {
                if (res) {
                    this.isLoading = false;
                    this.teamMembersgrid.setColumnData('lastName', this.teammembersData.indexOf(data), res.lastName);
                    this.teamMembersgrid.setColumnData('firstName', this.teammembersData.indexOf(data), res.firstName);
                    this.teamMembersgrid.setColumnData('position', this.teammembersData.indexOf(data), res.position);
                    this.teamMembersgrid.setColumnData('staffId', this.teammembersData.indexOf(data), res.staffId);
                    this.teamMembersgrid.setColumnData('role', this.teammembersData.indexOf(data), res.role);
                    this.teamMembersgrid.setColumnData('scheduleType', this.teammembersData.indexOf(data), res.scheduleType);
                    this.teamMembersgrid.setColumnData('hoursPerWeek', this.teammembersData.indexOf(data), res.hoursPerWeek);
                    this.teamMembersgrid.setColumnData('agyLocId', this.teammembersData.indexOf(data), res.agyLocId);
                    this.teamMembersgrid.setColumnData('locRoleFromDate', this.teammembersData.indexOf(data), res.fromDate);

                }
                if (this.teammembersModel.staffId) {
                    this.enableTeamMembersGrid = true;
                } else {
                    this.enableTeamMembersGrid = false;
                }
            });
        } else {
            this.show(this.translateService.translate('ocmteams.cannotupdaterecord'), 'warn');
            return false;
        }
    }
    validateTeamButton(data) {
        if (!data.createDatetime) {
            if (!data.functionType || !data.functionType.trim()) {
                this.show(this.translateService.translate('ocdvteam.functiontypeselectvalidation'), 'warn');
                return false;
            }
        } else {
            return false;
        }
        return true;


    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmteamsSaveteamsForm(event) {
        if (!this.ocmteamsTeamValidations()) {
            return;
        }
        this.teamsInsertList = event.added;
        this.teamsUpdatetList = event.updated;
        this.teamsDeleteList = event.removed;
        this.teamsCommitModel.insertList = [];
        this.teamsCommitModel.updateList = [];
        this.teamsCommitModel.deleteList = [];
        if (this.teamsInsertList.length > 0 || this.teamsUpdatetList.length > 0) {
            for (let i = 0; i < this.teamsInsertList.length; i++) {
                this.teamsInsertList[i].activeFlag = this.teamsInsertList[i].activeFlag ? 'Y' : 'N';
                this.teamsInsertList[i].areaCode = this.teamsSearchModel.areaCode;
                this.teamsCommitModel.insertList = this.teamsInsertList;
            }
            for (let i = 0; i < this.teamsUpdatetList.length; i++) {
                this.teamsUpdatetList[i].activeFlag = this.teamsUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.teamsCommitModel.updateList = this.teamsUpdatetList;
            }

        }
        if (this.teamsDeleteList.length > 0) {
            for (let i = 0; i < this.teamsDeleteList.length; i++) {
                this.teamsCommitModel.deleteList = this.teamsDeleteList;
            }
        }
        const teamsSaveData = this.ocmteamsFactory.teamsCommit(this.teamsCommitModel);
        teamsSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('TEAMS_PK') > 0) {
                this.show(this.translateService.translate('ocmteams.teamprimarykeyvalidation'), 'warn');
                this.ocmteamsexecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('TEAM_MEMBERS_TEAMS_FK') > 0) {
                this.show(this.translateService.translate('ocmteams.teammeberforignkeyvalidation'), 'warn');
                this.ocmteamsexecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('TEAM_FUNCTIONS_TEAMS_FK') > 0) {
                this.show(this.translateService.translate('ocmteams.teamfunctionforignkeyvalidation'), 'warn');
                this.ocmteamsexecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.ocmteamsexecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.ocmteamsexecuteQuery();
                return;
            }
        });
    }
    retriveBeforevlidations() {
        const is = { valid: true };
        if (!this.teamsSearchModel.agyLocType || this.teamsSearchModel.agyLocType === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmteams.searchfieldmandatory');
            this.show(this.message);
            is.valid = false;
        }
        if (!this.teamsSearchModel.areaCode || this.teamsSearchModel.areaCode === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmteams.searchfieldmandatory');
            this.show(this.message);
            is.valid = false;
        }
        return is.valid;
    }
    /*execute query*/
    ocmteamsexecuteQuery() {
        if (!this.retriveBeforevlidations()) {
            return;
        }
        this.teamsSearchModel.currentCaseLoad = this.sessionManager.currentCaseLoad;
        const serviceObj = this.ocmteamsFactory.teamsExecuteQuery(this.teamsSearchModel);
        serviceObj.subscribe(data => {
            this.enableTeamGridInsert = true;
            if (data.length === 0) {
                this.teamsData = [];
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
                this.namesReadOnlyArea = true;
                this.show('common.querycaused');
                this.gridInsBtn = true;
                return;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.checkFlag = element.checkFlag === 'Y' ? true : false;
                });
                this.teamsData = data;
                this.teamsModel = this.teamsData[0];
                this.teamsIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
                this.namesReadOnlyArea = true;
                this.gridInsBtn = true;
            }
        });
    }
    validateRowDataTeams = (event) => {
        const rowIndex = this.teamsData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'teamCode') {
            if (event.data.teamCode) {
                this.validateTeamCode(event);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'activeFlag') {
            /* if (event.field === 'activeFlag' && event.data.updateDeleteAllowedCount === 0 && event.data.checkFlag != undefined
                && event.data.checkFlag !== event.newValue) {
                this.teamsgrid.setColumnData('activeFlag', rowIndex, event.data.checkFlag);
                rowdata.validated = true;
                return rowdata;
            } else */ if (event.data.activeFlag) {
                this.teamsgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.verifyTeamMembersData(event);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    verifyTeamMembersData(event) {
        this.teammembersValidateModel = new TeamMembers();
        this.teammembersValidateModel.teamId = event.data.teamId;
        const serviceObj = this.ocmteamsFactory.verifyTeamMembersData(this.teammembersValidateModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.show(this.translateService.translate('ocmteams.inactiveteamcheckbox'), 'warn');
                this.teamsgrid.setColumnData('activeFlag', this.teamsData.indexOf(event.data), true);
                this.teamsgrid.setColumnData('expiryDate', this.teamsData.indexOf(event.data), undefined);
                return;
            } else {
                this.teamsgrid.setColumnData('expiryDate', this.teamsData.indexOf(event.data),
                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                return;
            }
        });
    }
    validateTeamCode(event) {
        this.teamsValidateModel = new Teams();
        this.teamsValidateModel.teamCode = event.data.teamCode;
        this.teamsValidateModel.areaCode = this.teamsSearchModel.areaCode;
        this.teamCodeExist = false;
        const serviceObj = this.ocmteamsFactory.validateTeamCode(this.teamsValidateModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.show(this.translateService.translate('ocmteams.teamcodealreadyexist'), 'warn');
                this.teamCodeExist = true;
                return;
            } else {
                this.teamCodeExist = false;
            }
        });
    }
    senTeamsInsert = () => {
        if (!this.ocmteamsTeamValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    ocmteamsTeamValidations() {
        const is = { valid: true };
        if (this.teamsData && this.teamsData) {
            this.teamsData.forEach(element => {
                if (!element.teamCode) {
                    this.show(this.translateService.translate('ocmteams.teamcodemandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.description) {
                    this.show(this.translateService.translate('ocmteams.teamnamemandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.category) {
                    this.show(this.translateService.translate('ocmteams.categorymandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.agyLocId) {
                    this.show(this.translateService.translate('ocmteams.locationmandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        if (this.teamCodeExist) {
            this.show(this.translateService.translate('ocmteams.teamcodealreadyexist'), 'warn');
            is.valid = false;
            return is.valid;
        }
        return is.valid;
    }
    teamfunctionsExecuteQuery() {
        const teamfunctionsResult = this.ocmteamsFactory.
            teamFunctionsExecuteQuery(this.teamfunctionsModel);
        teamfunctionsResult.subscribe(teamfunctionsResultList => {
            if (teamfunctionsResultList.length === 0) {
                this.teamfunctionsData = [];
            } else {
                this.teamfunctionsData = teamfunctionsResultList;
                this.teamfunctionsModel = teamfunctionsResultList[0];
                this.teamfunctionsIndex = 0;
            }
        });
    }
    teamFunctionInsert = () => {
        if (!this.ocmteamsTeamFunctionValidations()) {
            return;
        }
        return {};
    }
    ocmteamsTeamFunctionValidations() {
        const is = { valid: true };
        if (this.teamfunctionsData && this.teamfunctionsData) {
            this.teamfunctionsData.forEach(element => {
                if (!element.functionType) {
                    this.show(this.translateService.translate('ocmteams.functiontypemandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        return is.valid;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmteamsSaveteamfunctionsForm(event) {
        if (!this.ocmteamsTeamFunctionValidations()) {
            return;
        }
        this.teamfunctionsInsertList = event.added;
        this.teamfunctionsUpdatetList = event.updated;
        this.teamfunctionsDeleteList = event.removed;
        this.teamfunctionsCommitModel.insertList = [];
        this.teamfunctionsCommitModel.updateList = [];
        this.teamfunctionsCommitModel.deleteList = [];
        if (this.teamfunctionsInsertList.length > 0 || this.teamfunctionsUpdatetList.length > 0) {
            for (let i = 0; i < this.teamfunctionsInsertList.length; i++) {
                this.teamfunctionsInsertList[i].teamId = this.teamsModel.teamId;
                this.teamfunctionsCommitModel.insertList = this.teamfunctionsInsertList;
            }
            for (let i = 0; i < this.teamfunctionsUpdatetList.length; i++) {
                this.teamfunctionsCommitModel.updateList = this.teamfunctionsUpdatetList;
            }

        }
        if (this.teamfunctionsDeleteList.length > 0) {
            for (let i = 0; i < this.teamfunctionsDeleteList.length; i++) {
                this.teamfunctionsCommitModel.deleteList = this.teamfunctionsDeleteList;
            }
        }
        const teamfunctionsSaveData = this.ocmteamsFactory.teamFunctionsCommit(this.teamfunctionsCommitModel);
        teamfunctionsSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('TEAM_FUNCTIONS_PK') > 0) {
                this.show(this.translateService.translate('ocmteams.functiontypeprimarykeyviolaion'), 'warn');
                this.teamfunctionsExecuteQuery();
                return;
            }
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
                this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
                this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
                this.show(this.message, 'warn');
                this.teamfunctionsExecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.teamfunctionsExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.teamfunctionsExecuteQuery();
                return;
            }
        });
    }
    /*execute query*/
    ocmteamsAvailexecuteQuery() {
        const serviceObj = this.ocmteamsFactory.
            availTeamExecuteQuery(this.availteamModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.availteamData = data;
                this.availteamModel = this.availteamData[0];
                this.availteamIndex = 0;

            }
        });
    }
    ocmteamAviailAllExecuteQuery() {
        const serviceObj = this.ocmteamsFactory.
            availTeamActiveExecuteQuery(this.availteamModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.availteamData = data;
                this.availteamModel = this.availteamData[0];
                this.availteamIndex = 0;

            }
        });
    }
    teammembersExecuteQuery() {
        const teammembersResult = this.ocmteamsFactory.teamMembersExecuteQuery(this.teammembersModel);
        teammembersResult.subscribe(teammembersResultList => {
            if (teammembersResultList.length === 0) {
                this.teammembersData = [];
            } else {
                teammembersResultList.forEach(element => {
                    element['button'] = '..';
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.checkFlag = element.checkFlag === 'Y' ? true : false;
                });
                this.teammembersData = teammembersResultList;
                this.teammembersModel = teammembersResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    validateRowDataFunction = (event) => {
        const rowIndex = this.teamfunctionsData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'functionType') {
            if (event.data.functionType) {
                this.validateFunctionCode(event);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateFunctionCode(event) {
        this.teamfunctionsValidationModel = new TeamFunctions();
        this.teamfunctionsValidationModel.functionType = event.data.functionType;
        this.teamfunctionsValidationModel.teamId = this.teamsModel.teamId;
        const serviceObj = this.ocmteamsFactory.validateFunctionCode(this.teamfunctionsValidationModel);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.show(this.translateService.translate('ocmteams.functiontypealreadyexists'), 'warn');
                this.teamsgrid.setColumnData('functionType', this.teamfunctionsData.indexOf(event.data), undefined);
                return;
            }
        });

    }
    onGridClearStaff = () => {
        this.teammembersExecuteQuery();
        return;
    }
    validateRowDataStaff = (event) => {
        const rowIndex = this.teammembersData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag' && !this.deleteFlagTemp && event.data.checkFlag !== event.newValue) {
            this.teamMembersgrid.setColumnData('activeFlag', rowIndex, event.data.checkFlag);
            rowdata.validated = true;
            return rowdata;
        }
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.teamMembersgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.teamMembersgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmteamsSaveteammembersForm(event) {
        this.teammembersInsertList = event.added;
        this.teammembersUpdatetList = event.updated;
        this.teammembersDeleteList = event.removed;
        this.teammembersCommitModel.insertList = [];
        this.teammembersCommitModel.updateList = [];
        this.teammembersCommitModel.deleteList = [];
        if (this.teammembersInsertList.length > 0 || this.teammembersUpdatetList.length > 0) {
            for (let i = 0; i < this.teammembersInsertList.length; i++) {
                this.teammembersInsertList[i].teamId = this.teamsModel.teamId;
                this.teammembersInsertList[i].activeFlag = this.teammembersInsertList[i].activeFlag ? 'Y' : 'N';
                this.teammembersCommitModel.insertList = this.teammembersInsertList;
            }
            for (let i = 0; i < this.teammembersUpdatetList.length; i++) {
                this.teammembersUpdatetList[i].activeFlag = this.teammembersUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.teammembersCommitModel.updateList = this.teammembersUpdatetList;
            }
        }
        if (this.teammembersDeleteList.length > 0) {
            for (let i = 0; i < this.teammembersDeleteList.length; i++) {
                this.teammembersCommitModel.deleteList = this.teammembersDeleteList;
            }
        }
        const teammembersSaveData = this.ocmteamsFactory.teamMembersCommit(this.teammembersCommitModel);
        teammembersSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('TEAM_MEMBERS_PK') > 0) {
                this.show(this.translateService.translate('ocmteams.teammemberprimarykey'), 'warn');
                this.teammembersExecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.teammembersExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.teammembersExecuteQuery();
                return;
            }
        });
    }
    onAgyLocTypeBlur() {
        if (!this.teamsSearchModel.agyLocType) {
            this.teamsSearchModel.agyLocType = this.teamsSearchModel.agyLocType === '' ? undefined : '';
        }
    }

    onAreaBlur() {
        if (!this.teamsSearchModel.areaCode) {
            this.teamsSearchModel.areaCode = this.teamsSearchModel.areaCode === '' ? undefined : '';
        }
    }
    /* get gridInsBtn() {
        if ((this.teamsSearchModel.agyLocType ||  this.teamsSearchModel.agyLocType !== undefined)
        && (this.teamsSearchModel.areaCode || this.teamsSearchModel.areaCode !== undefined)) {
          return true;
        }
        return false;
      } */
}

